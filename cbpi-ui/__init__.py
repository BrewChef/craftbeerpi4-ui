
import logging
import os
import re
import weakref
from collections import defaultdict

import aiohttp
from aiohttp import web
from cbpi.api import *
from cbpi.utils import json_dumps
from voluptuous import Schema


class UIWebSocket:
    def __init__(self, cbpi) -> None:

        self.cbpi = cbpi
        self._callbacks = defaultdict(set)
        self._clients = weakref.WeakSet()
        self.logger = logging.getLogger(__name__)
        self.cbpi.app.add_routes([web.get('/ws1', self.websocket_handler)])
        self.cbpi.bus.register_object(self)
        self.actor_pattern = re.compile("(actor)\/([\d])\/(on|toggle|off)\/(ok)$")
        self.sensor_pattern = re.compile("(sensor)\/([\d])\/(data)$")
        self.kettle_pattern = re.compile("(kettle)\/([\d])\/(targettemp)\/(set)$")


    @on_event(topic="actor/+/+/ok")
    async def listen2(self, topic, **kwargs):

        result = self.actor_pattern.match(topic)
        actor_id = int(result.group(2))
        self.send(dict(topic="ACTOR_UPDATE", data=await self.cbpi.actor.get_one(actor_id)))


    @on_event(topic="sensor/+/data")
    async def listen3(self, topic, value, **kwargs):
        result = self.sensor_pattern.match(topic)
        sensor_id = int(result.group(2))
        self.send(dict(topic="SENSOR_UPDATE", data=dict(id=sensor_id, value=value)))

    @on_event(topic="kettle/+/targettemp/set")
    async def listen4(self, topic, **kwargs):
        result = self.kettle_pattern.match(topic)
        kettle_id = int(result.group(2))
        self.send(dict(topic="KETTLE_UPDATE", data=await self.cbpi.kettle.get_one(kettle_id)))

    @on_event(topic="step/brewing/stopped")
    async def listen5(self, topic, **kwargs):
        self.send(dict(topic="STEP_UPDATE", data=await self.cbpi.step.get_all()))

    @on_event(topic="step/+/started")
    async def listen6(self, topic, **kwargs):
        self.send(dict(topic="STEP_UPDATE", data=await self.cbpi.step.get_all()))

    @on_event(topic="step/brewing/finished")
    async def listen7(self, topic, **kwargs):
        self.send(dict(topic="STEP_UPDATE", data=await self.cbpi.step.get_all()))



    async def listen(self, topic, **kwargs):
        data = dict(topic=topic, data=dict(**kwargs))
        self.logger.debug("PUSH %s " % data)
        self.send(data)


    def send(self, data):
        self.logger.debug("broadcast to ws clients. Data: %s" % data)
        for ws in self._clients:
            async def send_data(ws, data):
                await ws.send_json(data=data, dumps=json_dumps)
            self.cbpi.app.loop.create_task(send_data(ws, data))

    async def websocket_handler(self, request):
        ws = web.WebSocketResponse()
        await ws.prepare(request)

        self._clients.add(ws)
        peername = request.transport.get_extra_info('peername')
        if peername is not None:
            host, port = peername
        else:
            host, port = "Unknowen"

        self.logger.info("Client Connected - Host: %s Port: %s  - client count: %s " % (host, port, len(self._clients)))
        try:
            await ws.send_json(data=dict(topic="connection/success"))
            async for msg in ws:
                if msg.type == aiohttp.WSMsgType.TEXT:

                    msg_obj = msg.json()
                    schema = Schema({"topic": str, "data": dict})
                    schema(msg_obj)

                    topic = msg_obj.get("topic")
                    data = msg_obj.get("data")
                    if topic == "close":
                        await ws.close()
                    else:
                        if data is not None:
                            await self.cbpi.bus.fire(topic=topic, **data)
                        else:
                            await self.cbpi.bus.fire(topic=topic)
                elif msg.type == aiohttp.WSMsgType.ERROR:
                    self.logger.error('ws connection closed with exception %s' % ws.exception())

        except Exception as e:
            self.logger.error("%s - Received Data %s" % (str(e), msg.data))

        finally:
            self._clients.discard(ws)

        self.logger.info("Web Socket Close")

        return ws

class CBPiUi(CBPiExtension):

    def __init__(self, cbpi):
        self.cbpi = cbpi
        path = os.path.dirname(__file__)
        self.cbpi.register(self, "/ui", static=os.path.join(path, "static"))

        self.actor_ok_pattern = re.compile("(actor)\/([\d])\/(on|toggle|off)\/(ok)$")
        self.sensor_pattern = re.compile("(sensor)\/([\d])\/(data)$")


    @on_event("actor/+/+/ok")
    async def on_actor_event(self, topic, *kwargs):
        result = self.actor_ok_pattern.match(topic)
        actor_id = int(result.group(2))
        data = dict(topic="ACTOR_UPDATE", data=await self.cbpi.actor.get_one(actor_id))
        self.cbpi.ws.send(data)

    @on_event("sensor/+/data")
    async def on_sensor_event(self, topic, value, *kwargs):
        result = self.sensor_pattern.match(topic)
        sensor_id = int(result.group(2))
        data = dict(topic="SENSOR_UPDATE", data=dict(id=sensor_id, value=value))
        self.cbpi.ws.send(data)


def setup(cbpi):

    cbpi.plugin.register("UI", CBPiUi)
    ws_client = UIWebSocket(cbpi)
