import {push} from "react-router-redux";

const initial_state = () => {

    let result = {
        isAuthenticated: false
    }

    return result
}

const session = (state = initial_state(), action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, isAuthenticated: true}
        case "LOGOUT":
            return {...state, isAuthenticated: false}
        default:
            return state
    }
}

export const login = () => {
    return (dispatch, getState) => {
        dispatch({"type": "LOGIN"})
        dispatch(push("/page2"))
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        dispatch({"type": "LOGOUT"})
        dispatch(push("/"))
    }
}




export default session
