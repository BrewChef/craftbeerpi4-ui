import React, {Component} from "react";
import {getActiveLanguage, getTranslate, Translate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import {bindActionCreators} from "redux";
import {add} from "../../../recucers/dashboard";

const state_name = "tank"

const mapStateToProps = (state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: state[state_name].list
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({add}, dispatch),
    }
}

@connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
export default class TankAddModal extends Component {
    state = {modal: false}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {

        let {translate, dbid} = this.props
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}><Translate id="PLEASE_SELECT_TANK"/></ModalHeader>
                <ModalBody>
                    {_.map(this.props.data, (value, key) => <Button block key={key} color="primary" onClick={() => {
                        this.toggle()
                        this.props.actions.add(dbid, { type: state_name, element_id: value.id, x: 0, y: 0},)
                    }}>{value.name}</Button>)}
                     <Button block color="secondary" onClick={this.toggle.bind(this)}><Translate id="CANCEL"/></Button>
                </ModalBody>

            </Modal>
        )
    }
}


