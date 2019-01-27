import React from "react";
import {connect} from "react-redux";
import BasicTable from "../../common/Table";
import {push} from "react-router-redux";
import {load} from "../../recucers/tank";

const reducer_name = "tank"

const render_actor = (row_value, column_value, row_key, column_key, props) => {
    try {

        return props.actors[row_value.heater].name
    }
    catch (e) {
        return ""
    }
}

const render_sensor = (row_value, column_value, row_key, column_key, props) => {
    try {

        return props.sensors[row_value.sensor].name
    }
    catch (e) {
        return ""
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        cols: [
            {label: "Name", name: "name"},
            {label: "Heater", name: "heater", render: render_actor},
            {label: "Sensor", name: "sensor", render: render_sensor},
            {label: "Sensor", name: "sensor2", render: render_sensor},
            {label: "Sensor", name: "sensor3", render: render_sensor},

        ],
        items: state[reducer_name].list,
        actors: state.actor.list,
        sensors: state.sensor.list
    }
}

const mapDispatchToProps = (dispatch, ownProps, test) => {
    return {

        load: () => {
            dispatch(load())
        },
        edit: (id) => {
            dispatch(push("/app/"+reducer_name+"/" + id))
        }
    }
}

const TankTable = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {withRef: true}
)(BasicTable)

export default TankTable

