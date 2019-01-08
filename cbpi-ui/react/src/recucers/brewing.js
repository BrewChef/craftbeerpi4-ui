import axios from "axios";
import {goBack, push, replace} from "react-router-redux";
import _ from "lodash";
import {add as show_alert} from "./alert";
import {rest_api} from "./rest_helper";
import {arrayMove} from "react-sortable-hoc";

const KEY = "BREWING"
const base_path = "/brewing"

const initial_state = () => ({
        list: {},
        types: {},
        recipes: []
    })

export const save = (id, data) => rest_api(base_path+"/"+id , KEY+"_SAVE", "put", {}, {...data}, undefined, (dispatch) => { dispatch(show_alert("STEP SAVED","","success",2000))});
export const remove = (idx,id) => rest_api(base_path+"/"+id , KEY+"_REMOVE", "delete", {idx,id}, undefined, undefined, (dispatch)=>dispatch(goBack()));
export const add = (data) => rest_api(base_path+"/" , KEY+"_ADD", "post", {}, {...data}, undefined, undefined, (dispatch,getState,request, response) => dispatch(replace("step/"+response.data.id)));
export const remove_all = () => rest_api(base_path+"/" , KEY+"_REMOVE_ALL", "delete", {}, undefined, undefined, undefined);
export const start = () => rest_api(base_path+"/next" , KEY+"START", "get", {});
export const reset_all = () => rest_api(base_path+"/reset/all" , KEY+"RESET_ALL", "get", {});
export const reset_current = () => rest_api(base_path+"/reset/current" , KEY+"RESET_CURRENT", "get", {});
export const save_recipe = () => rest_api(base_path+"/save" , KEY+"SAVE", "post", {});
export const get_recipes = () => rest_api(base_path+"/recipes" , KEY+"_GET_RECIPES", "get", {});
export const load_recipe = (name) => rest_api(base_path+"/load/"+name , KEY+"_LOAD_RECIPE", "post", {});

export const sort_steps = (data) => {
    return (dispatch, getState) => {
        dispatch({type: "SORT_"+KEY+"_STEPS", payload: data})
        axios.post("/brewing/sort", data).then(()=> {}).catch(()=>{})

    }
}


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
            return {...state, list: action.payload.brewing, types: {...action.payload.step.types}}
        case "STEP_UPDATE":
            return {...state, list: action.payload}
        default:
            return state
    }
}

export default brewing