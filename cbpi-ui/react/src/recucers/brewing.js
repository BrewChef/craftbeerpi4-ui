import {goBack, replace} from "react-router-redux";
import _ from "lodash";
import {rest_api, RESTApi} from "./rest_helper";

const KEY = "BREWING"
const base_path = "/step"

const initial_state = () => ({
        list: {},
        types: {},
        recipes: []
    })


const api = new RESTApi("/step", "BREWING")

export const save = (id, data) => api.put({
    url: "/"+id,
    action: "SAVE",
    data,
    success_msg: "SETP_SAVED"
})

export const remove = (idx,id) => api.delete({
    url: "/"+id,
    action:"REMOVE",
    context:{idx,id},
    success_msg: "STEP_REMOVED",
    post_response:(dispatch)=> dispatch(goBack())
})

export const add = (data) =>  api.post({
    url:"/",
    action: "ADD",
    success_msg: "STEP_ADDED",
    data,
    post_response: (dispatch,state,request,response) => dispatch(replace("step/"+response.data.id))
})

export const remove_all = () => api.delete({
    url: "/",
    action: "REMOVE_ALL"
})

export const start = () => api.get({
    url: "/start",
    action: "START",
    success_msg: "BREWING_STARTED"
})

export const reset_all = () => api.get({
    url: "/stop",
    action: "RESET_ALL",
    success_msg: "BREWING_STOPPED"
})

export const sort_steps = (data) => api.post({
    url: "/sort",
    data: data,
    success_msg: "BREWING_NEW_ORDER_SAVED",
    post_response: (dispatch,state,request,response) => dispatch({type: "SORT_"+KEY+"_STEPS", payload: data})

})

export const reset_current = () => rest_api(base_path+"/reset/current" , KEY+"RESET_CURRENT", "get", {});
export const save_recipe = () => rest_api(base_path+"/save" , KEY+"SAVE", "post", {});
export const get_recipes = () => rest_api(base_path+"/recipes" , KEY+"_GET_RECIPES", "get", {});
export const load_recipe = (name) => rest_api(base_path+"/load/"+name , KEY+"_LOAD_RECIPE", "post", {});


const brewing = (state = initial_state(), action) => {
    switch (action.type) {
        case KEY+"_ADD_DATA_RECEIVED":
        case KEY+"_SAVE_DATA_RECEIVED":
            return {...state, list: {...state.list, [action.payload.id]: action.payload}}
        case KEY+"_REMOVE_DATA_RECEIVED":
             return {...state, list: _.omit(state.list, action.context.id)}
        case KEY+"_REMOVE_ALL_DATA_RECEIVED":
             return {...state, list: {}}
        case KEY+"_GET_RECIPES_DATA_RECEIVED":
             return {...state, recipes: action.payload}
        case "SORT_BREWING_STEPS":
            return {...state, list: _.each(state.list, (value,index) => {value.order = action.payload[value.id]; return value })}
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return {...state, list: action.payload.step.items, types: {...action.payload.step.types}}
        case "STEP_UPDATE":
            return {...state, list: action.payload}
        default:
            return state
    }
}

export default brewing