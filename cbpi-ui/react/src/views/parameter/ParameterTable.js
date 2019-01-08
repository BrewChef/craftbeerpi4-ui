import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, Jumbotron, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import BasicTable from "../../common/Table";
import {goBack, push} from "react-router-redux";
import {load} from "../../recucers/kettle";
const reducer_name = "parameter"

const render_value = (row_value, column_value, row_key, column_key, props) => {
    try {
        switch(row_value.type) {
            case "select":
                let o = row_value.options.find((item)=> item.value == row_value.value )

                return o.label
            default:
                return row_value.value
        }

    }
    catch (e) {
        return ""
    }
}

const render_link = (row_value, column_value, row_key, column_key, props) => {
    return <b onClick={()=>{props.edit(row_value.name)}}>{row_value.name}</b>
}


const mapStateToProps = (state, ownProps) => {

    return {
        cols: [
            {label: "Name", name: "name", render: render_link},
            {label: "Value", name: "value", render: render_value},
            {label: "Description", name: "description"}

        ],
        items: state[reducer_name].list,
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

