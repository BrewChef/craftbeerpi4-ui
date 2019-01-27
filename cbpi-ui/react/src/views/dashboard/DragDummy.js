import React, {Component} from "react"
import {connect} from "react-redux";
import {Button} from "reactstrap";
import Draggable from "react-draggable";
import "./Dashboard.css";
import {add, load_content, move, remove} from "../../recucers/dashboard";

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

        let {x,y,id, dbid, size, name, element_id, type, children} = this.props;
        console.log("TYPE", type, this.props)
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
                    <div style={{position: 'absolute', top: 0, right: 0}}>
                            <Button size="sm" color="success" onClick={() => {
                                    this.props.edit(dbid, id)
                                }}><i className="fa fa-edit"/></Button>
                                <Button size="sm" color="danger" onClick={() => {
                                    this.props.remove(dbid, id)
                                }}><i className="fa fa-trash-alt"/></Button>
                            </div>
                </div>
            </Draggable>)
    }
}