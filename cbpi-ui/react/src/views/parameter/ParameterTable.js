import React from "react";
import {connect} from "react-redux";
import BasicTable from "../../common/Table";
import {push} from "react-router-redux";
import {Translate} from "react-localize-redux";
import {Button} from "reactstrap";

const reducer_name = "parameter"

const render_value = (row_value, column_value, row_key, column_key, props) => {
    try {
        switch(row_value.type) {
            case "select":
                let o = row_value.options.find((item)=> item.value == row_value.value )
                return o.label
            case "kettle":
                if (row_value.value && row_value.value in props.kettles) {
                   return  props.kettles[row_value.value].name
                }
                return <Translate id="PARAMETER_NOT_SET"/>
            case "actor":
                if (row_value.value && row_value.value in props.actors) {
                   return  props.actors[row_value.value].name
                }
                return <Translate id="PARAMETER_NOT_SET"/>
            case "sensor":
                if (row_value.value && row_value.value in props.sensors) {
                   return  props.sensors[row_value.value].name
                }
                return <Translate id="PARAMETER_NOT_SET"/>

            default:
                return row_value.value
        }

    }
    catch (e) {
        return ""
    }
}

const render_link = (row_value, column_value, row_key, column_key, props) => {
    return <div><Button  size="sm"  onClick={()=>{props.edit(row_value.name)}}><i className="fa fa-edit"/></Button> {row_value.name}</div>

}


const mapStateToProps = (state, ownProps) => {

    return {
        cols: [
            {label: "Name", name: "name", render: render_link},
            {label: "Value", name: "value", render: render_value},
            {label: "Description", name: "description"}

        ],
        items: state[reducer_name].list,
        kettles: state.kettle.list,
        sensors: state.sensor.list,
        actors: state.actor.list
    }
}

const mapDispatchToProps = (dispatch, ownProps, test) => {
    return {
        edit: (name) => {
            dispatch(push("/app/"+reducer_name+"/" + name))
        }
    }
}

const ParameterTable = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {withRef: true}
)(BasicTable)

export default ParameterTable

