import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Jumbotron, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {goBack, push} from "react-router-redux";
import SelectElementModal from './SelectElementModal'
import {OptionModal, ConfirmModal} from '../../common'
import EditDashboardModal from './EditDashboardModal'
import {add, toggle_edit, remove_dashboard} from "../../recucers/dashboard";
import TextModal from './TextModal'
/*

@connect((state, ownProps) => {
    return {
        edit: state.dashboard.edit,
        dashboard: state.dashboard.dashboards[ownProps.dasboard_id]
    }
}, (dispatch, ownProps) => {
    return {

        add: (id, data) => {
            dispatch(add(id, data))
        },
        toggle: () => {
            dispatch(toggle_edit())
        },
        remove_dashboard: (id) => {
            dispatch(remove_dashboard(id))
        }

    }
}, null, {withRef: true})

export default class DashboardMenu extends Component {

    render_options() {
        if (this.props.edit){
            return (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Button color="primary" onClick={() => {
                        this.refs.edit.wrappedInstance.show(this.props.dashboard.name)
                    }}>Settings</Button>

                    <EditDashboardModal ref="edit" />

                    <Button color="primary" onClick={()=> {this.refs.delete_confirm.wrappedInstance.toggle()}}>Delete</Button>
                    <ConfirmModal ref="delete_confirm" title="DELETE DASHBOARD" message="ARE_YOU_SURE" confirm={()=> {this.props.remove_dashboard(this.props.dasboard_id)}} cancel={()=>{}}/>
                    <Button color="primary" onClick={() => {
                        this.refs.k.wrappedInstance.toggle()
                    }}>Kettle</Button>
                    <Button color="primary" onClick={() => {
                        this.refs.a.wrappedInstance.toggle()
                    }}>Actor</Button>
                    <Button color="primary" onClick={() => {
                        this.refs.s.wrappedInstance.toggle()
                    }}>Sensor</Button>
                    <Button color="primary" onClick={() => {
                        this.refs.tank.wrappedInstance.toggle()
                    }}>Tank</Button>

                    <Button color="primary" onClick={() => {
                        this.refs.t.wrappedInstance.toggle()
                    }}>Text</Button>
                    <Button color="primary">Button</Button>
                    <Button color="primary" onClick={()=>{this.props.add(this.props.dasboard_id, {type:"step_list", config: {}})}}>Step</Button>
                    <Button color="primary" onClick={()=>{this.props.add(this.props.dasboard_id, {type:"step_control", config: {}})}}>Step Ctrl</Button>
                    <Button color="primary" onClick={()=>{this.props.add(this.props.dasboard_id, {type:"brew_name", config: {}})}}>Brew Name</Button>

                    <Button color="primary">Fermenter</Button>
                    <Button color="primary" onClick={()=>this.refs.om.wrappedInstance.toggle()}>Image</Button>

                    <OptionModal ref="om" title="PLEASE SELECT" options={[{label:"HALLO", color: "warning", action: ()=> {console.log("HALLO WELT")}}]}/>
                    <SelectElementModal dbid={this.props.dasboard_id} ref="k" title="KETTLE" type="kettle"/>
                    <SelectElementModal dbid={this.props.dasboard_id} ref="a" title="ACTOR" type="actor"/>
                    <SelectElementModal dbid={this.props.dasboard_id} ref="s" title="SENSOR" type="sensor"/>
                    <SelectElementModal dbid={this.props.dasboard_id} ref="tank" title="TANK" type="tank"/>
                    <TextModal dbid={this.props.dasboard_id} ref="t"/>
                </div>
            )
        }
    }

    render() {
        return (<div style={{display: 'flex', flexDirection: 'column'}}>

            {this.render_options()}
        </div>)
    }
}
*/