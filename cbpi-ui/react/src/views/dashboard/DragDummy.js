import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";

import {connect} from "react-redux";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Jumbotron, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Draggable from "react-draggable";
import "./Dashboard.css";
import KettleWidget from "./widget/KettleWidget";
import ActorWidget from "./widget/ActorWidget";
import SensorWidget from "./widget/SensorWidget";

import {add, load_content, move, remove} from "../../recucers/dashboard";

import DashboardMenu from './DashboardMenu'

@connect((state, ownProps) => {
    return {
        boxes: state.dashboard.content,
        edit: state.dashboard.edit
    }
}, (dispatch, ownProps) => {
    return {
        move: (x, y) => {
            dispatch(move(ownProps.dbid, ownProps.id, x, y))
        },
        add: (id, data) => {
            dispatch(add(id, payload))
        },
        remove: (dbid, id) => {

            dispatch(remove(dbid, id))
        },
        load: (id) => {
            dispatch(load_content(id))
        }

    }
}, null, {withRef: true})
export default class DragDummy extends Component {

    handleStop(data) {

        this.props.move(data.lastX, data.lastY)
    }

    render () {

        let {x,y,id, dbid, size, name, children} = this.props;

        return (<Draggable
                bounds="parent"
                position={{x, y}}

                onStop={(e, data) => {
                    this.handleStop(data)
                }}
                handle=".handle"
                grid={[5, 5]}>

                <div className="handle" style={{position: 'absolute', top: 0, left: 0}}>

                    {children}
                    <div style={{position: 'absolute', top: -20, right: -20}}>

                                <Button size="sm" color="danger" onClick={() => {
                                    this.props.remove(dbid, id)
                                }}><i className="fa fa-trash-alt"/></Button>
                            </div>
                </div>
            </Draggable>)
    }
}

/*
<Card className="card-bg" style={size}>
                        <CardBody style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <span className="text-dark">{name}</span>
                            <div style={{position: 'absolute', top: 0, right: 0}}>

                                <Button size="sm" color="primary" onClick={() => {
                                    this.props.remove(dbid, id)
                                }}><i className="fa fa-trash-alt"/></Button>
                            </div>
                        </CardBody>
                    </Card>
 */