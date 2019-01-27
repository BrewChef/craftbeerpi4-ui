import {rest_api} from './rest_helper'

const initial_state = () => {

    let result = {
        ready: false
    }

    return result
}

export const load = () => rest_api("/system" , "SYSTEM_LOAD", "get");

const session = (state = initial_state(), action) => {
    switch (action.type) {
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return {...state, ready: true}
        default:
            return state
    }
}






export default session
