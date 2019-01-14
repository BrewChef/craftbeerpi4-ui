
import os
import re

from cbpi.api import *

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
