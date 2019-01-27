import React from "react";
import {connect} from "react-redux";
import SortableTable from "../../common/SortableTable";
import {push} from "react-router-redux";
import {sort_steps} from '../../recucers/brewing'
import Countdown from "../../common/Countdown";

const reducer_name = "brewing"

const render_state = (row_value, column_value, row_key, column_key, props) => {
    switch (row_value.state) {
        case "D":
            return (<i className="fa fa-check"/>)
        case "A":
            return [<i className="fa fa-spinner fa-spin"/>, <Countdown end={row_value.stepstate.timer_end*1000}/>]
        default:
            return ""
    }
}


const StepTable = connect(
    (state, ownProps) => {

        return {
            cols: [
                {label: "Name", name: "name"},
                {label: "State", name: "state", render: render_state},
                {label: "Type", name: "type"},
                {label: "Start", render: (row_value, column_value, row_key, column_key, props)=>  row_value.start ? new Date(row_value.start * 1000).toLocaleTimeString() : undefined},
                {label: "End", render: (row_value, column_value, row_key, column_key, props)=>  row_value.end ? new Date(row_value.end * 1000).toLocaleTimeString() : undefined},

            ],

            items: _.sortBy(state[reducer_name].list,["order"])

        }
    },
    (dispatch, ownProps, test) => {
        return {

            sort_elements: (new_order) => {
                dispatch(sort_steps(new_order))

            },
            edit: (id) => {
                dispatch(push("/app/step/" + id))
            }
        }
    }
    ,
    null,
    {withRef: true}
)(SortableTable)

export default StepTable

