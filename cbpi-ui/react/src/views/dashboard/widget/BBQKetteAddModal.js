import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Jumbotron, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {goBack, push} from "react-router-redux";
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
export default class BBQKetteAddModal extends Component {
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
                    {_.map(this.props.data, (value, key) => <Button block key={key} color="primary" onClick={() => {
                        this.toggle()
                        this.props.actions.add(dbid, { type: "bbq", element_id: value.id, x: 0, y: 0},)
                    }}>{value.name}</Button>)}
                     <Button block color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                </ModalBody>

            </Modal>
        )
    }
}


