import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, Jumbotron, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import BasicTable from "../../common/Table";
import {goBack, push} from "react-router-redux";

const reducer_name = "sensor"

const render_state = (row) => {

    switch (row.state) {
        case "D":
            return (<i className="fa fa-check"/>)
        case "A":
            return (<i className="fa fa-circle-o-notch fa-spin"/>)
        default:
            return (<i className="fa fa-gear"/>)
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        cols: [
            {label: "Name", name: "name"},
            {label: "Type", name: "type"},
            {label: "State", name: "state", render: (row_value) => 1}


        ],
        items: state[reducer_name].list
    }
}

const mapDispatchToProps = (dispatch, ownProps, test) => {
    return {

        edit: (id) => {
            dispatch(push("/app/"+reducer_name+"/" + id))
        }
    }
}

const SensorTable = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {withRef: true}
)(BasicTable)

export default SensorTable

