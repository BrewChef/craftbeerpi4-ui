import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {get_parameter} from '../../../recucers/parameter'
import {bindActionCreators} from "redux";

const reducer_name = "sensor"

@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        name: get_parameter(state, "NAME", "NO_NAME")
    }
}, (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack}, dispatch)

    }
}, null, {withRef: true})
export default class BrewNameWidget extends Component {

    render = () => {

        let {goBack, save, add, remove} = this.props.actions
        let {name} = this.props

        if(this.props.dummy) {
            return <div className="card-bg" >BREW_NAME</div>
        }

        let { x, y} = this.props
        return <div style={{position: 'absolute', top: y, left: x}}>
                {name}

        </div>
    }

}

