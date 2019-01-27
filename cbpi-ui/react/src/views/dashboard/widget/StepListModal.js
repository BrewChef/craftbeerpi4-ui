import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import {bindActionCreators} from "redux";
import {add} from "../../../recucers/dashboard";

const mapStateToProps = (state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: state.kettle.list
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({add}, dispatch),
    }
}

@connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
export default class SSKetteAddModal extends Component {
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
                <ModalHeader toggle={this.toggle.bind(this)}>ADD MODAL</ModalHeader>
                <ModalBody>
                     <Button block color="secondary" onClick={() => {
                        this.toggle()
                        this.props.actions.add(dbid, { type: "step_list", config:{type:"small"},  x: 0, y: 0},)
                    }}>Small</Button>
                    <Button block color="secondary" onClick={() => {
                        this.toggle()
                        this.props.actions.add(dbid, { type: "step_list", config:{type:"large"},  x: 0, y: 0},)
                    }}>Large</Button>
                     <Button block color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                </ModalBody>

            </Modal>
        )
    }
}


