import {rest_api} from './rest_helper'

const KEY = "PLUGINS"
const base_path = "/system"
const initial_state = () => {

    let result = {
        list: {},
        loading: false
    }

    return result
}


export const load = () => rest_api(base_path+"/plugins" , KEY+"_LOAD", "get");
export const download = (name) => rest_api(base_path+"/plugins/"+name , KEY+"_DOWNLOAD", "get", {name});
export const remove = (name) => rest_api(base_path+"/plugins/"+name , KEY+"_DELETE", "DELETE", {name});

const plugins = (state = initial_state(), action) => {
    switch (action.type) {
        case "PLUGINS_LOAD_DATA_RECEIVED":
            return {...state, list: action.payload, loading: false}
        case "PLUGINS_LOAD_START_LOADING":
            return {...state, loading: true}
        case "PLUGINS_DOWNLOAD_START_LOADING":
            return {...state, list: {...state.list, [action.context.name]: {...state.list[action.context.name], loading: true}}}
        case "PLUGINS_DOWNLOAD_DATA_RECEIVED":
            return {...state, list: {...state.list, [action.context.name]: {...state.list[action.context.name], loading: false, installed: true}}}
        case "PLUGINS_DELETE_DATA_RECEIVED":
            return {...state, list: {...state.list, [action.context.name]: {...state.list[action.context.name], loading: false, installed: false}}}
        default:
            return state
    }
}


export default plugins
