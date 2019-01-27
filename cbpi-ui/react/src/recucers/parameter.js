import {rest_api, RESTApi} from './rest_helper'

const KEY = "PARAMETER"
const base_path = "/config"
const initial_state = () => ({list:[]})



const api  = new RESTApi(base_path, KEY)
export const save = (name, value, success_msg="PARAMETER_SAVED") => api.put({
    url: "/"+name+"/",
    action: "SAVE",
    context: {name, value},
    success_msg,
    data: {value}
})




export const get_parameter = (state, key, default_value) => state.parameter.list[key] ? state.parameter.list[key].value : default_value

const parameter = (state = initial_state(), action) => {
    switch (action.type) {
        case "PARAMETER_SAVE_DATA_RECEIVED":
            return {...state, list: {...state.list, [action.context.name] : {...state.list[action.context.name], value: action.context.value}}}
        case "CONFIG_UPDATE":
            return {...state, list: {...state.list, [action.payload.name] : action.payload}}
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return {...state, list: {...action.payload.config}}
        default:
            return state
    }
}


export default parameter
