import axios from "axios";
import {push, goBack, replace} from "react-router-redux";
import _ from "lodash";
import {add as add_alert} from './alert'
import {rest_api} from './rest_helper'
const KEY = "CHART"
const base_path = "/chart"

const initial_state = () => ({
        data : undefined
})

export const load = (type,id) => rest_api(base_path+"/"+type+"/"+id , KEY+"_LOAD", "get");

const chart = (state = initial_state(), action) => {
    switch (action.type) {

        case KEY+"_LOAD_DATA_RECEIVED":
            return {...state, data: action.payload}
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return state
        default:
            return state
    }
}

export default chart