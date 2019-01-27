import {goBack, replace} from "react-router-redux";
import _ from "lodash";
import {rest_api, RESTApi} from './rest_helper'

const KEY = "ACTOR"
const base_path = "/actor"

const initial_state = () => {

    let result = {
        list: {},
        types: {}
    }
    return result
}

const api = new RESTApi(base_path, KEY)

export const add = (data) => api.post({
    url: "/",
    action: "ADD",
    data,
    post_response: (dispatch,getState,request, response) => dispatch(replace("actor/"+response.data.id))

})

export const load = (data) => api.get({
    url: "/",
    action: "LOAD",
})

export const save = (id, data) => api.put({
    url: "/"+id ,
    action: "SAVE",
    data,
})

export const remove = (id) => api.delete({
    url: "/"+id,
    action: "REMOVE",
    context: {id},
    pre_response: (dispatch)=>dispatch(goBack())
})

export const toggle = (id) => api.post({
    url: "/"+id+"/toggle",
    success_msg: undefined,
    action: "TOGGLE"
})

export const toggle_time = (id, time) => api.post({
    url: "/"+id+"/toggle",
    success_msg: undefined,
    data: {time},
    action: "TOGGLE"
})

export const call_action = (id, action) => api.post({
    url: "/"+id+"/action",
    success_msg: undefined,
    data: {name:action, parameter:{}},
    action: "ACTION"
})

export const set_power = (id, power) => api.post({
    url: "/"+id+"/power/" + power,
    success_msg: undefined,
    action: "SET_POWER"
})


const actor = (state = initial_state(), action) => {
    switch (action.type) {
        case KEY+"_ADD_DATA_RECEIVED":
        case KEY+"_SAVE_DATA_RECEIVED":
            return {...state, list: {...state.list, [action.payload.id]: action.payload}}
        case KEY+"_LOAD_DATA_RECEIVED":
            return {...state, list: {...action.payload}}
        case KEY+"_REMOVE_DATA_RECEIVED":
             return {...state, list: _.omit(state.list, action.context.id)}
        case "ACTOR_UPDATE":
            return {...state, list: {...state.list, [action.payload.id]: action.payload}}
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return {...state, list: {...action.payload.actor.items}, types: {...action.payload.actor.types}}
        default:
            return state
    }
}

export default actor