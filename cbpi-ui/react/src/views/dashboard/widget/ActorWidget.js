import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Jumbotron, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {toggle, call_action, set_power, toggle_time} from "../../../recucers/actor";
import {bindActionCreators} from "redux";
import Countdown from "../../../common/Countdown";
import classNames from "classnames";

const reducer_name = "actor"




@connect((state, ownProps) => {
    return {
        data: ownProps.id ? state[reducer_name].list[ownProps.id] : {},

    }
}, (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({set_power,toggle_time}, dispatch)
    }
}, null, {withRef: true})
class OptionModal extends Component {


    state = {modal: false}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    cancel(e) {
        this.props.cancel()
        this.toggle()
    }

    confirm(e) {
        this.props.confirm()
        this.toggle()
    }

    toggle_time(time) {
        this.toggle()
        this.props.actions.toggle_time(this.props.id, time)
    }

    render() {
        let {title, id, data, cancel, options=[]} = this.props
        console.log(data)
        let {set_power, toggle_time} = this.props.actions
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>{title}</ModalHeader>
                <ModalBody>
                    {_.map(options, (value, key)=> <Button key={key} onClick={()=>{this.toggle(); value.action()}} block color={value.color || 'primary'} >{value.label}</Button>)}


                    <div style={{display: 'flex', flexDirection:'row'}}>
                    <div style={{flex: 1}}>
                        Set Power
                    <div style={{display: 'flex', flex: 1, width: '100%', alignItems:'center', justifyContent:"space-between"}}>
                        <Button onClick={()=>{set_power(id,  parseInt(data.power)-1)}}><i className="fa fa-minus"/></Button>
                        {data.power}%
                        <Button onClick={()=>{set_power(id, parseInt(data.power)+1)}}><i className="fa fa-plus"/></Button>
                    </div>
                    </div>
                    <div style={{flex: 1}}>
                        Time Based
                    <ButtonGroup >
                        <Button onClick={()=>{this.toggle_time(10)}}>10s</Button>
                        <Button onClick={()=>{this.toggle_time(30)}}>30s</Button>
                        <Button onClick={()=>{this.toggle_time(60)}}>60s</Button>
                    </ButtonGroup>
                    </div>
                    </div>
                    <hr/>
                    { cancel  ? (<Button block color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>):null}
                </ModalBody>

            </Modal>
        )
    }
}

@connect((state, ownProps) => {
    return {


    }
}, (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({set_power}, dispatch)
    }
}, null, {withRef: true})
class TimeModal extends Component {


    state = {modal: false}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    cancel(e) {
        this.props.cancel()
        this.toggle()
    }

    confirm(e) {
        this.props.confirm()
        this.toggle()
    }

    render() {
        let {title, id, data, cancel, options=[]} = this.props


        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>{title}</ModalHeader>
                <ModalBody>

                    { cancel  ? (<Button block color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>):null}
                </ModalBody>

            </Modal>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        data: ownProps.id ? state[reducer_name].list[ownProps.id] : {},
        config: state[reducer_name].form_config,
        types: state[reducer_name].types,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack,toggle,call_action}, dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
export default class ActorWidget extends Component {

    render_options() {

        let {data, id, types} = this.props

        let {call_action} = this.props.actions
        if (data.type && types[data.type]) {

            let type_cfg = types[data.type]

            let options = _.map(type_cfg.actions, (value, idx) => ({label: value.label, action:()=>{call_action(id, value.method)}}))

            return [
                <Button color="primary" onClick={()=>{this.refs.modal.wrappedInstance.toggle()}} style={{width: 50}}>
                    <i className="fa fa-cog"/>
                </Button>,
                <OptionModal cancel ref="modal" id={id} title={data.name} options={options}/>
                ]

        }
    }


    render = () => {
        let {goBack, save, add, remove} = this.props.actions
        let {data, x, y, dummy, id} = this.props
        if (!data) {
            return <div className="not_found_bg" style={{position: 'absolute', top: y, left: x, width: 225, height: 75}}>NOT FOUND</div>
        }

        if(dummy) {
            return <div className="card-bg" style={{width: 225, height: 75}}>{data.name}</div>
        }


        let color = classNames( {
            'success': data.state === true,
            'primary': data.state === false
        });

        return <div style={{position: 'absolute', top: y, left: x}}>
            <ButtonGroup >
                <Button onClick={()=>{this.props.actions.toggle(id)}} color={color} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 175, height: 75}}>
                    <i className="fa fa-power-off"/>
                    <div style={{marginLeft: 10}}>
                        <div style={{fontSize: '1.2em'}}>
                            {data.name}
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"}}>
                            <div style={{fontSize: '1em'}}>

                                    {data.timer ? (<Countdown end={data.timer}/>): (data.power + "%")}
                                </div>
                        </div>
                    </div>
                </Button>

                {this.render_options()}
            </ButtonGroup>

        </div>
    }
}


