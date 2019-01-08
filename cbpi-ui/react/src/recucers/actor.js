
import {push, goBack, replace} from "react-router-redux";
import _ from "lodash";
import {add as add_alert} from './alert'
import {rest_api} from './rest_helper'

const KEY = "ACTOR"
const base_path = "/actor"
const initial_state = () => {

    let result = {
        list: {

        },
        types: {
            t1: {label: "T1", parameter: {name: {label: "Name", type: "text"}}},
            t2: {
                label: "T2", parameter: {
                    www: {label: "WWW", type: "text"}
                }
            }
        }

    }

    return result
}

export const add = (data) => rest_api(base_path+"/" , KEY+"_ADD", "post", {}, {...data}, undefined, undefined, (dispatch,getState,request, response) => dispatch(replace("actor/"+response.data.id)));
export const load = () => rest_api(base_path+"/" , KEY+"_LOAD", "get");
export const save = (id, data) => rest_api(base_path+"/"+id , KEY+"_SAVE", "put", {}, {...data});
export const remove = (id) => rest_api(base_path+"/"+id , KEY+"_REMOVE", "delete", {id}, undefined, undefined, (dispatch)=>dispatch(goBack()));
export const toggle = (id) => rest_api(base_path+"/"+id+"/toggle" , KEY+"_TOGGLE", "post");
export const toggle_time = (id, time) => rest_api(base_path+"/"+id+"/toggle/"+time , KEY+"_TOGGLE", "post");
export const call_action = (id, action) => rest_api(base_path+"/"+id+"/action/"+action , KEY+"_CALL_ACTION", "post");
export const set_power = (id, power) =>  rest_api(base_path+"/"+id+"/power/"+power , KEY+"_SET_POWER", "post", {});

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