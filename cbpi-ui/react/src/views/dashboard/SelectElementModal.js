import React, {Component} from "react";
import {getTranslate} from "react-localize-redux";

import {connect} from "react-redux";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";

import {add} from "../../recucers/dashboard";

const Text = ({value}) => <div style={{position: 'absolute', top: value.y, left: value.x}}>HALLO</div>

@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        data: state[ownProps.type].list
    }
}, (dispatch, ownProps) => {
    return {

        add: (id, data) => {

            dispatch(add(id, data))
        }
    }
}, null, {withRef: true})
export default class SelectElementModal extends Component {
    state = {modal: false}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {

        let {title, translate} = this.props
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>{translate(title)}</ModalHeader>
                <ModalBody>

                    {_.map(this.props.data, (value, key) => <Button block key={key} color="primary" onClick={() => {

                        this.toggle()
                        this.props.add(this.props.dbid, { type: this.props.type, element_id: value.id, x: 0, y: 0},)
                    }}>{value.name}</Button>)}
                     <Button block color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
                </ModalBody>

            </Modal>
        )
    }
}