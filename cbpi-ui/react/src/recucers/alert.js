import {rest_api} from "./rest_helper";

const KEY = "ALERT"

const initial_state = () => ({list: {}})


export const add = (title, text, color = "success", timeout = undefined) => {
    return (dispatch, getState) => {
        const  id = new Date().getTime()
        dispatch({type: "ADD_"+KEY, payload: {id, title, text, color, timeout, visible: true}})

    }
}

export const alert = (options) => {

    options = {
        text: "",
        title: "",
        color: "success",
        timeout: undefined,
        visible: true,
        id: new Date().getTime(),
        ...options
    }
    return (dispatch, getState) => {

        dispatch({type: "ADD_"+KEY, payload: options})

    }
}

export const dismiss = (id) => {
    return (dispatch, getState) => {
        dispatch({type: "DISMISS_"+KEY, id})

    }
}

export const post_callback = (id, key) => rest_api("/system/alert/"+id+"/"+key , KEY+"_ACTION_CALL_BACK", "post", {});
export const response = (id, key) => {

    return (dispatch, getState) => {
        dispatch(post_callback(id,key))
        dispatch(dismiss(id))
    }
}


const actor = (state = initial_state(), action) => {
    switch (action.type) {
        case "NOTIFY":
            return {...state, list: {...state.list, [action.payload.id]: {...action.payload, visible: true}}}
        case "ADD_"+KEY:
            return {...state, list: {...state.list, [action.payload.id]: action.payload}}
        case "DISMISS_"+KEY:
            return {...state, list: {...state.list, [action.id]: {... state.list[action.id], visible: false}}}
        default:
            return state
    }
}

export default actor