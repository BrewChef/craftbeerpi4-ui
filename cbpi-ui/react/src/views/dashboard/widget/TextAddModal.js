import React, {Component} from "react";
import {getActiveLanguage, getTranslate, Translate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, ButtonGroup, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import {add} from "../../../recucers/dashboard";
import {goBack, push} from "react-router-redux";

@connect((state, ownProps) => {
    return {}
}, (dispatch, ownProps) => {
    return {
        add: (id, data) => {
            dispatch(add(id, data))
        }
    }
}, null, {withRef: true})
export default class TextAddModal extends Component {

    state = {modal: false, text: "", size: 15}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    save() {
        this.props.add(this.props.dbid, {type: "text", config: {text: this.state.text, size: parseInt(this.state.size)}})
        this.setState({text: "", size: 15})
        this.toggle()
    }

    render() {

        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>Text</ModalHeader>
                <ModalBody>

                    <FormGroup >
                        <Label for="exampleEmail">Text</Label>

                        <Input value={this.state.text} onChange={(e) => {
                            this.setState({text: e.target.value})
                        }} type="text" name={name} id="exampleEmail"/>
                        <Label>Font Size</Label>
                        <InputGroup>
                            <Input value={this.state.size} onChange={(e) => { this.setState({size: e.target.value})}} type="number" id="size"/>
                            <InputGroupAddon addonType="append">
                                <InputGroupText>px</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle.bind(this)}><Translate id="CANCEL"/></Button>
                    <Button color="secondary" onClick={this.save.bind(this)}><Translate id="ADD"/></Button>
                </ModalFooter>
            </Modal>
        )
    }
}
