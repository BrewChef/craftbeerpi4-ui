import React, {Component} from "react";

import {connect} from "react-redux";
import {Button} from "reactstrap";

import "./Dashboard.css";

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