import {rest_api} from './rest_helper'

const KEY = "LOG"
const base_path = "/system"

const initial_state = () => ({list: {}})

export const load = () => rest_api(base_path+"/logs" , KEY+"_LOAD", "get");
export const clear_all = () => rest_api(base_path+"/logs" , KEY+"_DELETE_ALL", "delete");
export const clear_log = (name) => rest_api(base_path+"/"+name , KEY+"_DELETE", "delete", {name});

const logs = (state = initial_state(), action) => {
    switch (action.type) {
        case "LOG_LOAD_DATA_RECEIVED":
             return {...state, list: action.payload}
        case "LOG_DELETE_ALL_DATA_RECEIVED":
            return {...state, list: {}}
        case "LOG_DELETE_DATA_RECEIVED":
            return {...state, list: state.list.filter((item, idx) => item != action.context.name)}
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return {...state}
        default:
            return state
    }
}

export default logs