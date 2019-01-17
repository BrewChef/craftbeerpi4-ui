import axios from "axios";
import {push} from "react-router-redux";
import {rest_api} from "./rest_helper";
import {ActorAddModal, ActorWidget, BrewNameWidget, KettleAddModal, KettleWidget, SensorAddModal, SensorWidget, StepControls, StepList, TankWidget, TextWidget} from '../views/dashboard/widget'

const initial_state = () => {

    let result = {
        dashboards: {},
        content: [],
        edit: false,
        widgets: {
            kettle: {
                name: "Kettle",
                component: KettleWidget,
                dialog: KettleAddModal
            },
            actor: {
                name: "Actor",
                component: ActorWidget,
                dialog: ActorAddModal
            },
            sensor: {
                name: "Sensor",
                component: SensorWidget,
                dialog: SensorAddModal
            },
            text: {
                name: "Text",
                component: TextWidget,
                dialog: KettleAddModal
            },
            step_list: {
                name: "Step List",
                component: StepList
            },
            step_control: {
                name: "Step Controls",
                component: StepControls
            },
            brew_name: {
                name: "Brew Name",
                component: BrewNameWidget
            },
            tank: {
                name: "Tank",
                component: TankWidget,
                dialog: KettleAddModal
            }
        }

    }

    return result
}

export const load_all = () => rest_api('/dashboard', "DASHBOARD", "get")
export const load_content = (id) => rest_api('/dashboard/' + id + '/content', "DASHBOARD_CONTENT", "get")

export const move = (dashboard_id, id, x, y) => (dispatch, getState) => {
    dispatch({type: "DASHBOARD_CONTENT_MOVE", id, x, y})
    axios.post('/dashboard/' + dashboard_id + '/content/' + id + '/move', {id, x, y}).then(response => {
    })
}



export const add = (id, data) => rest_api("/dashboard/" + id + "/content", "DASHBOARD_CONTENT_ADD", "post", {}, {...data});
export const remove = (dashboard_id, content_id) => rest_api("/dashboard/" + dashboard_id + "/content/" + content_id, "DASHBOARD_CONTENT_REMOVE", "delete", {}, {dashboard_id, content_id});
export const add_dashboard = (name) => rest_api("/dashboard/", "DASHBOARD_ADD", "post", {}, {name}, undefined, undefined, (dispatch, getState, request, response) => {
    dispatch(push("/app/dashboard/" + response.data.id));
    dispatch(load_all());
});
export const remove_dashboard = (id) => rest_api("/dashboard/" + id, "DASHBOARD_REMOVE", "delete", {}, {}, undefined, undefined, (dispatch, getState, request, response) => {
    dispatch(push("/app/hardware/"));
    dispatch(load_all());
});

export const update_dashboard = (id, data) => rest_api("/dashboard/" + id, "DASHBOARD_SAVE", "put", {}, {...data}, undefined, undefined, (dispatch, getState, request, response) => {
    dispatch(load_all());
});

export const toggle_edit = () => (dispatch, getState) => {
    return dispatch({type: "DASHBOARD_TOGGLE_EDIT", edit: !getState().dashboard.edit})
}

export const scroll = (current_id) => (dispatch, getState) => {

    let db_list = _.keys(getState().dashboard.dashboards)
    console.log(current_id.toString())
    let idx = _.indexOf(db_list, current_id)
    console.log("LIST", db_list, "CURRENT", current_id, "IDX", idx, "L", db_list.length)
    if (idx < db_list.length) {
        dispatch(push("/app/dashboard/" + db_list[idx + 1]))
    } else {
        dispatch(push("/app/dashboard/" + db_list[0]))
    }

}

const dashboard = (state = initial_state(), action) => {
    switch (action.type) {
        case "DASHBOARD_CONTENT_MOVE":

            const updatedItems = state.content.map((item, index) => {

                if (item.id === action.id) {

                    return {...item, x: action.x, y: action.y}
                }
                return item
            })
            return {...state, content: [...updatedItems]}
        case "DASHBOARD_DATA_RECEIVED": {
            return {...state, dashboards: action.payload}
        }
        case "DASHBOARD_CONTENT_DATA_RECEIVED": {
            return {...state, content: action.payload}
        }
        case "DASHBOARD_CONTENT_ADD_DATA_RECEIVED": {
            return {...state, content: [...state.content, action.payload]}
        }
        case "DASHBOARD_CONTENT_REMOVE_DATA_RECEIVED": {
            return {...state, content: state.content.filter(item => item.id !== action.data.content_id)}
        }
        case "SYSTEM_LOAD_DATA_RECEIVED":
            return {...state, dashboards: {...action.payload.dashboard.items}}
        case "DASHBOARD_TOGGLE_EDIT":
            return {...state, edit: action.edit}
        default:
            return state
    }
}

export default dashboard