import axios from "axios";
import {alert} from "./alert";

export const rest_api = (url, prefix, method = "get", context = {}, data = undefined, pre_callback, pre_response, post_response) => {
    return (dispatch, getState) => {

        dispatch({type: prefix + "_START_LOADING", context, data})
        if (pre_callback !== undefined) {
            data = pre_callback(dispatch, getState, data, context)
        }

        axios({
            method,
            url,
            data,
        }).then(response => {
            if (pre_response !== undefined) {
                pre_response(dispatch, getState, data, context, response)
            }
            dispatch({type: prefix + "_DATA_RECEIVED", context, data, payload: response.data})
            dispatch({type: prefix + "_FINISH_LOADING"})
            if (post_response !== undefined) {
                post_response(dispatch, getState, {context, data}, response)
            }


        }).catch(error => {
            if (pre_response !== undefined) {
                pre_response(dispatch, getState, data, context)
            }

            dispatch({type: prefix + "_FINISH_LOADING"})
            dispatch({type: prefix + "_ERROR", context, data, payload: error})

            if (post_response !== undefined) {
                post_response(dispatch, getState, {context, data})
            }

        })
    }
}

export class RESTApi {
    

    constructor(base_path, key) {
        this.base = base_path
        this.key = key
        this.base_options = {
            method: undefined,
            action: "PLEASE_SET_ACTION",
            context: {},
            body: {},
            pre_callback: undefined,
            pre_response: undefined,
            post_response: undefined,
            success_msg: "REQUEST_SUCCESS",
            error_msg: "REQUEST_FAILED"
        }
    }


    get(options) {

        return this.call({...this.base_options, method: "get", ...options})
    }

    post(options) {
        return this.call({...this.base_options, method: "post", ...options})
    }

    put(options) {
        return this.call({...this.base_options, method: "put", ...options})
    }

    delete(options) {
        return this.call({...this.base_options, method: "delete", ...options})
    }

    call(options) {

        let {method, url, action, context, data, pre_callback,  pre_response, post_response, success_msg, error_msg} = options
        return (dispatch, getState) => {
            dispatch({type: this.key + "_" + action + "_START_LOADING", context, data})
            if (pre_callback !== undefined) {
                data = pre_callback(dispatch, getState, data, context)
            }

            axios({
            method: method,
            url: this.base + url,
            data,
        }).then(response => {
            if (pre_response !== undefined) {
                pre_response(dispatch, getState, data, context, response)
            }

            dispatch({type: this.key + "_" + action + "_DATA_RECEIVED", context, data, payload: response.data})

            if (success_msg != undefined) {
                dispatch(alert({title: success_msg, timeout: 2000}))
            }
            dispatch({type: this.key + "_" + action + "_FINISH_LOADING"})
            if (post_response !== undefined) {
                post_response(dispatch, getState, {context, data}, response)
            }


        }).catch(error => {
            dispatch(alert({title: error_msg, color: "danger", timeout: 2000}))

            if (pre_response !== undefined) {
                pre_response(dispatch, getState, data, context)
            }

            dispatch({type: this.key + "_" + action + "_FINISH_LOADING"})
            dispatch({type: this.key + "_" + action + "_ERROR", context, data, payload: error})

            if (post_response !== undefined) {
                post_response(dispatch, state(), {context, data})
            }

        })
        }
    }
}