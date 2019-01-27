import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {set_taget_temp, toggle_actor, toggle_logic} from "../../../recucers/kettle";
import {toggle} from "../../../recucers/actor";
import classNames from "classnames";
import {bindActionCreators} from "redux";

const reducer_name = "kettle"

const ActorButton = ({type, data, actors, toggle, className = "fa fa-fire"}) => {
    if (data[type]) {
        let color = classNames({
            'success': actors[data[type]].state === true,
            'primary': actors[data[type]].state === false
        });

        return (<Button style={{flex: 1}} color={color} onClick={() => {
            toggle(data[type])
        }}><i className={className}/></Button>)
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
        actions: bindActionCreators({push, goBack, toggle, set_taget_temp, toggle_actor, toggle_logic}, dispatch),
    }
}

@connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
export default class BBQKettle extends Component {



    render = () => {
        let {goBack, toggle, set_taget_temp, toggle_logic} = this.props.actions
        let {data, sensor, actor, dummy, x, y, id} = this.props

        if (!data) {
            return <div className="not_found_bg" style={{position: 'absolute', top: y, left: x, width: 225, height: 200}}>KETTLE NOT FOUND</div>
        }

        if (dummy) {
            return <div className="card-bg text-dark" style={{width: 225, height: 200}}>
                <div>BBQ </div>
                <div>{data.name}</div>
            </div>
        }

        return <div style={{position: 'absolute', top: y, left: x, width: 225, height: 200}}>

        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0" y="0" width="200" height="200" viewBox="0, 0, 200, 200">
  <g id="Ebene_1">
    <path d="M142.003,44.174 C142.003,44.174 141.582,41.66 139.769,39.843 C137.669,25.312 120.666,13.984 100,13.984 C79.334,13.984 62.332,25.312 60.231,39.843 C58.419,41.66 57.997,44.174 57.997,44.174 C52.819,49.353 55.696,60.86 57.997,64.312 L60.012,91.642 L61.45,93.944 C62.025,106.315 70.081,123.001 70.081,123.001 C74.108,125.302 87.63,127.603 100,127.603 C112.371,127.603 125.892,125.302 129.92,123.001 C129.92,123.001 137.975,106.315 138.55,93.944 L139.989,91.642 L142.003,64.312 C144.304,60.86 147.181,49.353 142.003,44.174 M100,16.556 C103.972,16.556 107.193,19.132 107.193,22.309 C107.193,25.487 103.972,28.063 100,28.063 C96.028,28.063 92.808,25.487 92.808,22.309 C92.808,19.132 96.028,16.556 100,16.556" fill="#B8B8B8"/>
    <path d="M111.884,15.281 L111.884,6.775 L107.48,3.61 L100.001,3.61 L100.001,15.281 z" fill="#B8B8B8"/>
    <path d="M88.116,15.281 L88.116,6.775 L92.52,3.61 L100,3.61 L101.031,15.924 z" fill="#B8B8B8"/>
    <path d="M6.646,55.106 L193.355,55.106 L193.355,57.119 L6.646,57.119 z" fill="#B8B8B8"/>
    <path d="M4.632,51.653 L52.1,51.653 L52.1,56.112 L4.632,56.112 z" fill="#B8B8B8"/>
    <path d="M147.9,51.653 L195.368,51.653 L195.368,56.112 L147.9,56.112 z" fill="#B8B8B8"/>
    <path d="M79.521,101.748 C79.823,100.688 79.208,99.584 78.148,99.283 C77.088,98.981 75.985,99.596 75.683,100.656 L49.182,193.848 C48.881,194.909 49.496,196.011 50.556,196.313 C51.615,196.615 52.719,196 53.02,194.939 L65.169,152.217 C65.361,151.388 65.598,150.574 65.865,149.77 L79.521,101.748 z" fill="#B8B8B8"/>
    <path d="M150.818,193.848 L124.317,100.656 C124.016,99.597 122.912,98.982 121.852,99.283 C120.793,99.584 120.178,100.688 120.479,101.748 L134.135,149.771 C134.403,150.574 134.64,151.389 134.831,152.217 L146.98,194.94 C147.282,196 148.385,196.615 149.445,196.314 C150.505,196.011 151.12,194.908 150.818,193.848" fill="#B8B8B8"/>
    <path d="M138.007,149.355 C133.261,134.761 118.048,124.079 100,124.079 C81.952,124.079 66.739,134.762 61.993,149.355 L65.169,152.145 L65.865,149.698 C70.127,136.9 83.791,127.531 100,127.531 C116.209,127.531 129.873,136.899 134.135,149.698 L134.831,152.145 L138.007,149.355 z" fill="#B8B8B8"/>
    <path d="M65.169,152.217 L65.865,149.77 C65.598,150.574 65.361,151.388 65.169,152.217" fill="#B8B8B8"/>
    <path d="M134.831,152.217 C134.64,151.388 134.403,150.574 134.135,149.77 L134.831,152.217 z" fill="#B8B8B8"/>
      <text transform="matrix(1, 0, 0, 1, 100, 63.54)">
      <tspan x="-20.016" y="8" font-family="HelveticaNeue-Bold" font-size="24" fill="#FFFFFF">{sensor.value} °C</tspan>
    </text>
  </g>
</svg>




        </ div >

    }

}



