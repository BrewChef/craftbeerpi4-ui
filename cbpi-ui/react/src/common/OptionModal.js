import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import {add, add_dashboard} from "../recucers/dashboard";
import PropTypes from 'prop-types';

@connect((state, ownProps) => ({}), (dispatch, ownProps) => ({}), null, {withRef: true})
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