import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, FormGroup, Input, Label, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {update_dashboard} from "../../recucers/dashboard";
import {goBack, push} from "react-router-redux";

@connect((state, ownProps) => {

    return {
        dashboard: state.dashboard.dashboards[ownProps.dbid]
    }
}, (dispatch, ownProps) => {
    return {
        add: (id, data) => {
            dispatch(add(id, data))
        },
        update_dashboard(data) {

            dispatch(update_dashboard(ownProps.dbid, data))
        }
    }
}, null, {withRef: true})
export default class EditDashboardModal extends Component {

    state = {modal: false, text:""}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange(e) {
        this.setState({name: e.target.value})
    }

    save(e) {
        this.props.update_dashboard({...this.props.dashboard, name: this.state.name})
        this.toggle()
    }


    show(name) {
        this.setState({name})
        this.toggle()
    }

    render() {
        let {text} = this.props
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>Edit Dashboard</ModalHeader>
                <ModalBody>
                    <FormGroup >
                        <Label for="exampleEmail">{text}</Label>
                        <Input value={this.state.name}  onChange={this.onChange.bind(this)} type="text"  id="exampleEmail"/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle.bind(this)}>Close</Button>
                    <Button color="secondary" onClick={this.save.bind(this)}>Save</Button>
                </ModalFooter>
            </Modal>
        )
    }
}