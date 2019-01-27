import React, {Component} from "react";
import {Translate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {add} from "../../recucers/dashboard";
import {save} from "../../recucers/parameter";

@connect((state, ownProps) => {
    return {

    }
}, (dispatch, ownProps) => {
    return {
        add: (id, data) => {
            dispatch(add(id, data))
        },
        save: (name, value) => {
            dispatch(save(name, value, "BREW_NAME_SAVED"))
        }
    }
}, null, {withRef: true})
export default class BrewNameModal extends Component {

    state = {modal: false, name: ""}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    save() {
        this.toggle()
        this.props.save("NAME", this.state.name)
    }

    show(name) {
        this.toggle()
        this.setState({name})
    }

    render() {

        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}><Translate id="SET_BREW_NAME"/></ModalHeader>
                <ModalBody>

                    <FormGroup >
                        <Label><Translate id="BREW_NAME"/></Label>

                        <Input value={this.state.name} onChange={(e) => {
                            this.setState({name: e.target.value})
                        }} type="text" name={name} />

                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle.bind(this)}><Translate id="CANCEL"/></Button>
                    <Button color="secondary" onClick={this.save.bind(this)}><Translate id="SAVE"/></Button>
                </ModalFooter>
            </Modal>
        )
    }
}
