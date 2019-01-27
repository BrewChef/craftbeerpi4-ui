import {goBack, replace} from "react-router-redux";
import _ from "lodash";

import {RESTApi} from './rest_helper'

const KEY = "KETTLE"
const base_path = "/kettle"

const initial_state = () => {
    let result = {
        list: {},
        types: {},
    }
    return result
}

const api = new RESTApi(base_path, KEY)

export const add = (data) => api.post({
    url: "/",
    action: "ADD",
    data,
    post_response: (dispatch,getState,request, response) => dispatch(replace("kettle/"+response.data.id))
})

export const load = () => api.get({
    url: "/",
    action: "LOAD"
})

export const save = (id, data) => api.put({
    url: "/"+id,
    action: "SAVE",
    data,
})

export const remove = (id) => api.delete({
    url: "/"+id,
    action: "REMOVE",
    context: {id},
    pre_response: (dispatch)=>dispatch(goBack())
})

export const set_taget_temp = (id, temp) => api.put({
    url: "/"+id+"/temp/"+temp,
    success_msg: undefined,
    action: "SET_TARGET_TEMP",

})

export const toggle_logic = (id) => api.post({
    url: "/"+id+"/automatic",
    success_msg: undefined,
    action: "TOGGLE_AUTOMATIC"

})

export const toggle_actor = (id) =>  (dispatch, getState) => { console.log(id)}


const kettle = (state = initial_state(), action) => {
    switch (action.type) {
        case KEY+"_ADD_DATA_RECEIVED":
        case KEY+"_SAVE_DATA_RECEIVED":
            return {...state, list: {...state.list, [action.payload.id]: action.payload}}
        case KEY+"_LOAD_DATA_RECEIVED":
            return {...state, list: {...action.payload}}
        case KEY+"_REMOVE_DATA_RECEIVED":
             return {...state, list: _.omit(state.list, action.context.id)}
        case "KETTLE_UPDATE":
            return {...state, list: {...state.list, [action.payload.id]: action.payload}}
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return {...state, list: {...action.payload.kettle.items}, types: {...action.payload.kettle.types}}
        default:
            return state
    }
}

export default kettle