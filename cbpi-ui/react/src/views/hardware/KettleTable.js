import React, {Component} from "react";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import BasicTable from "../../common/Table";
import {push} from "react-router-redux";
import OptionModal from "../../common/OptionModal";

const reducer_name = "kettle"

class KettleOptions extends Component {

    render() {
        return [<Button onClick={() => {
            this.refs.om.wrappedInstance.toggle()
        }}><i className="fa fa-ellipsis-v"/></Button>,
            <OptionModal ref="om" options={[{
                label: "Clear Log", action: () => {
                }
            }]}/>]

    }
}

const render_heater = (row_value, column_value, row_key, column_key, props) => {
    try {
        return props.actors[row_value.heater].name
    }
    catch (e) {
        return "NO HEATER"
    }
}

const render_sensor = (row_value, column_value, row_key, column_key, props) => {
    try {
        return props.sensors[row_value.sensor].name
    }
    catch (e) {
        return "NO HEATER"
    }
}

const render_agitator = (row_value, column_value, row_key, column_key, props) => {
    try {
        return props.actors[row_value.agitator].name
    }
    catch (e) {
        return "NO HEATER"
    }
}




const KettleTable = connect(
    (state, ownProps) => {

        return {
            cols: [
                {label: "Name", name: "name"},
                {label: "Heater", name: "heater", render: render_heater},
                {label: "Sensor", name: "sensor", render: render_sensor},
                {label: "Agitator", name: "agitator", render: render_agitator},
                {label: "Logic", name: "logic"}
            ],

            items: state[reducer_name].list,
            actors: state.actor.list,
            sensors: state.sensor.list
        }
    },
    (dispatch, ownProps, test) => {
        return {
            edit: (id) => {
                dispatch(push("/app/" + reducer_name + "/" + id))
            }
        }
    }
    ,
    null,
    {withRef: true}
)(BasicTable)

export default KettleTable

