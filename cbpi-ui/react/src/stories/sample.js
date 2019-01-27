import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {Translate} from 'react-localize-redux'
import ActorWidget from "../views/dashboard/widget/ActorWidget";

const mapStateToProps = (state, ownProps) => {
    return {
        name: state.actor.name
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

@connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
export default class Sample extends Component {
    render = () => {
        return(<div>{this.props.name}<Translate id="CANCEL"/>
        <ActorWidget /></div>)
    }
}