import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, FormGroup, Input, Label, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {add, add_dashboard} from "../../recucers/dashboard";
import {goBack, push} from "react-router-redux";

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
                        <Label for="exampleEmail">Text</Label>
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