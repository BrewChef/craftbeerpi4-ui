import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, Card, CardBody, CardText, CardTitle} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {set_taget_temp, toggle_logic} from '../../../recucers/kettle'
import {toggle} from '../../../recucers/actor'
import classNames from "classnames";
import {bindActionCreators} from "redux";
import {OptionModal} from "../../../common";

const reducer_name = "kettle"


const ActorButton = ({type, data, actors, toggle, className="fa fa-fire"}) => {
    if(data[type]) {
        let color = classNames( {
            'success': actors[data[type]].state === true,
            'primary': actors[data[type]].state === false
        });

        return(<Button style={{flex: 1}} color={color} onClick={()=>{toggle(data[type])}}><i className={className}/></Button>)
    }
    else {
        return null
    }
}

const LogicButton = ({ data, toggle}) => {

    if(data.logic) {
        let color = classNames( {
            'success': data.state === true,
            'primary': data.state === false
        });

        return(<Button style={{flex: 1}} color={color} onClick={()=>{toggle(data.id)}}><i className="fa fa-car"/></Button>)
    }
    else {
        return null
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: ownProps.id ? state[reducer_name].list[ownProps.id] : {},
        config: state[reducer_name].form_config,
        types: state[reducer_name].types,
        sensor: state[reducer_name].list[ownProps.id].sensor ? state.sensor.list[state[reducer_name].list[ownProps.id].sensor] : {},
        actor: state.actor.list
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack, toggle, set_taget_temp, toggle_logic}, dispatch),
    }
}

@connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
export default class KettleWidget extends Component {

    render = () => {
        let {goBack, push, toggle, set_taget_temp, toggle_logic} = this.props.actions
        let {data, sensor, actor,dummy, x, y, id} = this.props

        if(!data) {
            return <div className="not_found_bg" style={{position: 'absolute', top: y, left: x, width: 225, height: 200}}>KETTLE NOT FOUND</div>
        }

        if(dummy) {
            return <div className="card-bg text-dark" style={{width: 225, height: 200}}>{data.name}</div>
        }

        let options = [ {label: "Chart", action:()=>{push("/app/chart/kettle/"+id)}}]

        return <Card style={{position: 'absolute', top: y, left: x, width: 225, height: 200}}>
            <CardBody>
                <CardTitle>{data.name}</CardTitle>
                <CardText tag="div" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "space-between"}}>
                        <div style={{fontSize: '1.5em'}}>{sensor.value} °C</div>
                        <small className="text-muted">Current Temperature</small>
                    </div>
                    <div style={{display: 'flex', justifyContent: "space-between", alignSelf: 'stretch'}}>
                        <Button color="primary" onClick={()=>{set_taget_temp(id, data.target_temp - 1 )}}><i className="fa fa-minus"/></Button>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "space-between"}}>
                            <div style={{fontSize: '20px'}}>{data.target_temp} °C</div>
                            <small className="text-muted">Target Temperature</small>
                        </div>
                        <Button color="primary" onClick={()=>{set_taget_temp(id, data.target_temp + 1 )}}><i className="fa fa-plus"/></Button>
                    </div>
                </CardText>
                <div style={{display: 'flex', justifyContent: "space-between", alignItems: 'stretch'}}>
                    <ActorButton type="heater" data={data} toggle={toggle} actors={actor}/>
                    <ActorButton type="agitator" data={data} toggle={toggle} actors={actor} className="fa fa-sync"/>
                    <LogicButton data={data} toggle={toggle_logic}/>

                    <Button style={{flex: 1}} onClick={()=>{this.refs.modal.wrappedInstance.toggle()}} color="primary"><i className="fa fa-ellipsis-v"/></Button>
                    <OptionModal cancel ref="modal" title={data.name} options={options}/>
                </div>



            </CardBody>
        </ Card >

    }

}


