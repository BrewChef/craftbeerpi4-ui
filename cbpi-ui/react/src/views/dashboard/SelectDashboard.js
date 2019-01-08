import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";

import {connect} from "react-redux";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Jumbotron, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import "./Dashboard.css";

import {add, load_content, move, remove} from "../../recucers/dashboard";


@connect((state, ownProps) => {
    return {
        dashboards: state.dashboard.dashboards,
    }
}, (dispatch, ownProps) => {
    return {

    }
}, null, {withRef: true})
export default class SelectDashboard extends Component {


    render () {
        return (<div>
            {_.map(dashboards, (value, key)=> <Button>{value.name}</Button>)}
        </div>)
    }
}