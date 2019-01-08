import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, FormGroup, Input, Label, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {add, add_dashboard} from "../recucers/dashboard";
import {goBack, push} from "react-router-redux";
import PropTypes from 'prop-types';

@connect((state, ownProps) => {
    return {


    }
}, (dispatch, ownProps) => {
    return {
        add: (id, data) => {
            dispatch(add(id, data))
        },
        add_dashboard(name) {
            dispatch(add_dashboard(name))
        }
    }
}, null, {withRef: true})
export default class OptionModal extends Component {


    static propTypes = {
        title: PropTypes.string,
        options: PropTypes.array

    }


    state = {modal: false}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    cancel(e) {
        this.props.cancel()
        this.toggle()
    }

    confirm(e) {
        this.props.confirm()
        this.toggle()
    }

    render() {
        let {title, cancel, options} = this.props




        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>{title}</ModalHeader>
                <ModalBody>
                    {_.map(options, (value, key)=> <Button key={key} onClick={()=>{this.toggle(); value.action()}} block color={value.color || 'primary'} >{value.label}</Button>)}
                    { cancel  ? (<Button block color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>):null}
                </ModalBody>

            </Modal>
        )
    }
}