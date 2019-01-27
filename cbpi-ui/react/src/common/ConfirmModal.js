import React, {Component} from "react";
import {Translate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from 'prop-types';

@connect((state, ownProps) => ({}), () => ({}), null, {withRef: true})
export default class ConfirmModal extends Component {

    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
        cancel: PropTypes.func,
        confirm: PropTypes.func
    }

    state = {modal: false}

    toggle() {
        this.setState({modal: !this.state.modal});
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
        let {title, message} = this.props
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}><Translate id={title}/></ModalHeader>
                <ModalBody>
                    <Translate id={message}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.cancel.bind(this)}> <Translate id="CANCEL"/></Button>
                    <Button color="secondary" onClick={this.confirm.bind(this)}> <Translate id="CONFIRM"/></Button>
                </ModalFooter>
            </Modal>
        )
    }
}