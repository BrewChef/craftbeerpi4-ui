import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {goBack, push} from "react-router-redux";
import {set_taget_temp, toggle_actor, toggle_logic} from "../../../recucers/kettle";
import {toggle} from "../../../recucers/actor";
import {bindActionCreators} from "redux";
import sskettle from './kettel_ss.png';

const reducer_name = "kettle"


const mapStateToProps = (state, ownProps) => {
    return {

        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        sensor: state[reducer_name].list[ownProps.id].sensor ? state.sensor.list[state[reducer_name].list[ownProps.id].sensor] : {},
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack, toggle, set_taget_temp, toggle_actor, toggle_logic}, dispatch),
    }
}

@connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
export default class SSKettle extends Component {


    render = () => {
        let {goBack, toggle, set_taget_temp, toggle_logic} = this.props.actions
        let {data, sensor, actor, dummy, x, y, id} = this.props
        if (dummy) {
            return <div className="card-bg text-dark" style={{width: 225, height: 200}}>SS Kettle</div>
        }
        return <div style={{position: 'absolute', top: y, left: x, width: 225, height: 200}}>
            <img src={sskettle}/>
            <div style={{fontSize: '1.5em', color:"#000", textShadow: "2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c", position: 'absolute', top: 100, left: 0, width: 225, textAlign:'center'}}>{sensor.value} °C</div>
        </ div >
    }

}


