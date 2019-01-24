import axios from "axios";
import {push, goBack, replace} from "react-router-redux";
import _ from "lodash";
import {add as show_alert} from './alert'
import {rest_api} from './rest_helper'



const KEY = "KETTLE"
const base_path = "/kettle"

const initial_state = () => {

    let result = {
        list: {

        },
        types: {

        },


    }

    return result
}


export const add = (data) => rest_api(base_path+"/" , KEY+"_ADD", "post", {}, {...data}, undefined, undefined, (dispatch,getState,request, response) => dispatch(replace("kettle/"+response.data.id)));
export const load = () => rest_api(base_path+"/" , KEY+"_LOAD", "get");
export const save = (id, data) => rest_api(base_path+"/"+id , KEY+"_SAVE", "put", {}, {...data}, undefined, (dispatch) => {console.log("WOOOOHOO"); dispatch(show_alert("KETTLE SAVED","","success",2000))});
export const remove = (id) => rest_api(base_path+"/"+id , KEY+"_REMOVE", "delete", {id}, undefined, undefined, (dispatch)=>dispatch(goBack()));
export const set_taget_temp = (id, temp) =>  rest_api(base_path+"/"+id+"/temp/"+temp , KEY+"_SET_TARGET_TEMP", "put", {});
export const toggle_actor = (id) =>  (dispatch, getState) => { console.log(id)}
export const toggle_logic = (id) =>  rest_api(base_path+"/"+id+"/automatic" , KEY+"_TOGGLE_AUTOMATIC", "post", {});



const kettle = (state = initial_state(), action) => {
    switch (action.type) {
        case KEY+"_ADD_DATA_RECEIVED":
        case KEY+"_SAVE_DATA_RECEIVED":
            return {...state, list: {...state.list, [action.payload.id]: action.payload}}
        case KEY+"_LOAD_DATA_RECEIVED":
            return {...state, list: {...action.payload}}
        case KEY+"_REMOVE_DATA_RECEIVED":
             return {...state, list: _.omit(state.list, action.context.id)}
        case "KETTLE_UPDATE":
            return {...state, list: {...state.list, [action.payload.id]: action.payload}}
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return {...state, list: {...action.payload.kettle.items}, types: {...action.payload.kettle.types}}
        default:
            return state
    }
}

export default kettle