import React, {Component} from "react";
import {getActiveLanguage, getTranslate, Translate} from "react-localize-redux";
import {connect} from "react-redux";
import {Alert, Button} from "reactstrap";
import {bindActionCreators} from "redux";
import {goBack, push} from "react-router-redux";
import {dismiss, response} from "../recucers/alert";
import classNames from "classnames";

export class AlertWrapper extends React.Component {

    componentDidMount() {

        const {id, timeout} = this.props.alert
        if (timeout > 0) {
            this.timer = setTimeout(() => {
                this.props.onDismiss(id)
            }, timeout)
        }
    }

    render_buttons() {

        let {actions, id} = this.props.alert;
        if (actions && actions.length > 0) {
            return [
                <hr key="1"/>,
                <p key="2" className="mb-0">
                    {_.map(actions, (r_value, r_key) =>
                        <Button key={r_key} onClick={() => {
                            this.props.onResponse(id, r_value.key)
                        }}><i className="fa fa-check"/> {r_value.label}</Button>)}
                </p>
            ]
        }

    }

    render() {

        let {color, id, title, actions, text, timeout} = this.props.alert
        console.log(this.props)
        let props = {}
        if (!timeout || timeout <= 0) {
            props["toggle"] = () => {
                this.props.onDismiss(id)
            }
        }

        let icon = classNames("fa", {
            'fa-warning': color === "warning",
            'fa-info': color === "info",
            'fa-check': color === "success",
            'fa-exclamation-circle': color === "danger",
        });

        return (<Alert color={color} {...props} transition={{in: true, timeout: 200}}>
            <h4 className="alert-heading"><i className={icon}/> <Translate id={title}/></h4>
            {text ? (<p>{text}</p>) : undefined}
            {this.render_buttons()}
        </Alert>)
    }
}

@connect((state, ownProps) => {
        return {
            translate: getTranslate(state.locale),
            currentLanguage: getActiveLanguage(state.locale).code,
            alerts: _.filter(state.alert.list, (o) => o.visible)
        }
    }, (dispatch, ownProps) => {
        return {
            actions: bindActionCreators({push, goBack, dismiss, response}, dispatch)
        }
    }
    , null, {withRef: true})
export default class AlertBox extends Component {

    render() {
        return (
            <div style={
                {position: "fixed", bottom: 20, right: 20, width: 500, overflow: "scroll"}
            }>
                {_.map(this.props.alerts, (value, key) =>
                    <AlertWrapper key={key} onResponse={this.props.actions.response} onDismiss={this.props.actions.dismiss} alert={value}/>)
                }
            </div>
        )
    }
}

