

import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {bindActionCreators} from "redux";


const reducer_name = "sensor"

@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: ownProps.id ? state[reducer_name].list[ownProps.id] : {},
        config: state[reducer_name].form_config,


    }
}, (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack}, dispatch)

    }
}, null, {withRef: true})
export default class TextWidget extends Component {

    render = () => {

        let {goBack, save, add, remove} = this.props.actions
        let {value} = this.props

        if(this.props.dummy) {
            return <div style={{fontSize: value.config.size || 20}} className="card-bg" >{value.config.text}</div>
        }

        let { x, y} = this.props
        return <div style={{fontSize: value.config.size || 20, position: 'absolute', top: y, left: x}}>
                {value.config.text}

        </div>
    }

}

