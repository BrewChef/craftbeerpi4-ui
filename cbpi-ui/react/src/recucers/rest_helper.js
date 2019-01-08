import axios from "axios";

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