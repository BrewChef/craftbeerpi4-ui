import {alert} from "./recucers/alert";

class CBPiWebSocket {
  constructor() {
      this.ws = undefined
      this.connect_count = 0
  }

  connection_lost(e) {
        this.store.dispatch({type:"WS_CONNECTION_LOST"});
        console.log("##### ALERT LOST")
        this.store.dispatch(alert(
            {
            text: "No Connection the Server",
            title: "Connection Lost",
            color: "danger",
            timeout: undefined,
            id: "connection_lost",
            }
        ))
        setTimeout( () => {this.open()}, 5000)
  }

  open() {
      this.ws = new WebSocket('ws://' + document.domain + ':' + location.port + '/ws1', []);
      this.ws.onclose = this.connection_lost.bind(this)
      this.ws.onmessage = this.on_message.bind(this)
      this.ws.onopen = this.on_open.bind(this)
  }

  on_open() {
      if (this.connect_count > 0) {

          this.store.dispatch(alert(
            {
            text: "Reconnected",
            title: "Connection to server reestablished",
            color: "success",
            timeout: undefined,
            id: "connection",
            }
        ))
      }
      this.connect_count++
  }

  on_message(e) {
      let data = JSON.parse(e.data)
      this.store.dispatch({type:data.topic, payload:data.data});
  }

  connect(store) {
      this.store = store
      this.open()
  }


}


const cbpisocket = new CBPiWebSocket()


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

    cbpisocket.connect(store)





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
