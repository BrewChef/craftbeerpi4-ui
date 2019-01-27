import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {add, add_dashboard} from "../../recucers/dashboard";

@connect((state, ownProps) => ({}), (dispatch, ownProps) => (
    {
        add: (id, data) => {
            dispatch(add(id, data))
        },
        add_dashboard(name) {
            dispatch(add_dashboard(name))
        }
    }),
    null, {withRef: true})
export default class NewDashboardModal extends Component {

    state = {modal: false, text:""}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange(e) {
        this.setState({text: e.target.value})
    }

    save(e) {
        this.props.add_dashboard(this.state.text)
        this.toggle()
    }

    render() {
        let {title} = this.props
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>New Dashboard</ModalHeader>
                <ModalBody>
                    <FormGroup >
                        <Label for="exampleEmail">Name</Label>
                        <Input value={this.state.text}  onChange={this.onChange.bind(this)} type="text" name={name} id="exampleEmail"/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle.bind(this)}>Close</Button>
                    <Button color="secondary" onClick={this.save.bind(this)}>Add</Button>
                </ModalFooter>
            </Modal>
        )
    }
}