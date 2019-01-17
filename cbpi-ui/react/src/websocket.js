import io from "socket.io-client";
import Sockette from "sockette";




const ws = new WebSocket('ws://' + document.domain + ':' + location.port + '/ws1', []);




//const socket = io.connect('http://' + document.domain + ':' + location.port + '/ws');

const messageTypes = [
    'screen',
    'mqtt_message',
    'add_customer',
    'remove_customer',
    'update_customer',
    'push_image',
    'client_id',
    'client_connected',
    'client_disconnected',
    'CONTENT_UPDATE',
    'NOTIFY',
    'STEP_UPDATE',
    'KETTLE_UPDATE',
    'ACTOR_UPDATE',
    'SENSOR_UPDATE',
    'CONFIG_UPDATE'
].reduce((accum, msg) => {
    accum[msg] = msg
    return accum
}, {})

const init = (store) => {

    Object.keys(messageTypes).forEach(type => console.log(type))


    ws.onmessage = e => {
      let data = JSON.parse(e.data)
      console.log('#########Receive!', data);
        if(data.topic.match("(actor)\\/([\\d])\\/(on|toggle|off)\\/(ok)$")) {
            console.log("MATCH", data)
            //store.dispatch({type:"ACTOR_UPDATE", payload:data.data});
        }
        else {
            store.dispatch({type:data.topic, payload:data.data});
        }

    }
/*
  const ws = new Sockette('ws://localhost:8080/ws', {
  timeout: 5e3,
  maxAttempts: 10,
  onopen: e => console.log('Connected!', e),
  onmessage: e => {
      let data = JSON.parse(e.data)
      console.log('Receive!', data);
        store.dispatch({type:data.topic, data:data.data});
    },
  onreconnect: e => console.log('Reconnecting...', e),
  onmaximum: e => console.log('Stop Attempting!', e),
  onclose: e => console.log('Closed!', e),
  onerror: e => console.log('Error:', e)

});
  */
//store.dispatch({type:e.data.topic, data:e.data.data}),


    // add listeners to socket messages so we can re-dispatch them as actions
    // Object.keys(messageTypes).forEach(type => socket.on(type, (payload) => { store.dispatch({type, payload})}))
}

const emit = (type, payload) => {}

export {
    init,
    emit
}
