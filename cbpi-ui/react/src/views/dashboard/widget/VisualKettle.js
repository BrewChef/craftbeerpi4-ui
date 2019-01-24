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
export default class VisualKettle extends Component {

    render_fill() {

       // if(this.props.data.fill) {
            return (
                <g>
      <path d="M47.538,100 L152.462,100 C155.775,100 158.462,102.686 158.462,106 L158.462,171.308 C158.462,174.621 155.775,177.308 152.462,177.308 L47.538,177.308 C44.225,177.308 41.538,174.621 41.538,171.308 L41.538,106 C41.538,102.686 44.225,100 47.538,100 z" fill="#7B77F3"/>
      <path d="M100,200 C67.712,200 41.538,189.84 41.538,177.308 C41.538,164.775 67.712,154.615 100,154.615 C132.288,154.615 158.462,164.775 158.462,177.308 C158.462,189.84 132.288,200 100,200 z" fill="#4F4AFF"/>
      <path d="M100,122.692 C67.712,122.692 41.538,112.532 41.538,100 C41.538,87.468 67.712,77.308 100,77.308 C132.288,77.308 158.462,87.468 158.462,100 C158.462,112.532 132.288,122.692 100,122.692 z" fill="#4F4AFF"/>
    </g>
            )
        //}
    }

    render = () => {
        let {goBack, toggle, set_taget_temp, toggle_logic} = this.props.actions
        let {data, sensor, actor, dummy, x, y, id} = this.props

        if (!data) {
            return <div className="not_found_bg" style={{position: 'absolute', top: y, left: x, width: 225, height: 200}}>KETTLE NOT FOUND</div>
        }

        if (dummy) {
            return <div className="card-bg text-dark" style={{width: 225, height: 200}}>{data.name}</div>
        }

        return <div style={{position: 'absolute', top: y, left: x, width: 225, height: 200}}>




            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0" y="0" width="200" height="200" viewBox="0, 0, 200, 200">
  <g id="Ebene_1">
    <g>
      <path d="M41.538,22.308 L158.462,22.308 L158.462,177.692 L41.538,177.692 L41.538,22.308 z" fill="#C1C1C1"/>
      <path d="M41.538,22.308 L158.462,22.308 L158.462,177.692 L41.538,177.692 L41.538,22.308 z" fill-opacity="0" stroke="#000000" stroke-width="1"/>
    </g>
    <g>
      <path d="M100,200 C67.712,200 41.538,189.84 41.538,177.308 C41.538,164.775 67.712,154.615 100,154.615 C132.288,154.615 158.462,164.775 158.462,177.308 C158.462,189.84 132.288,200 100,200 z" fill="#8B8B8B"/>
      <path d="M100,200 C67.712,200 41.538,189.84 41.538,177.308 C41.538,164.775 67.712,154.615 100,154.615 C132.288,154.615 158.462,164.775 158.462,177.308 C158.462,189.84 132.288,200 100,200 z" fill-opacity="0" stroke="#000000" stroke-width="1"/>
    </g>
    <g>
      <path d="M100,45.385 C67.712,45.385 41.538,35.225 41.538,22.692 C41.538,10.16 67.712,-0 100,-0 C132.288,-0 158.462,10.16 158.462,22.692 C158.462,35.225 132.288,45.385 100,45.385 z" fill="#EDEDED"/>
      <path d="M100,45.385 C67.712,45.385 41.538,35.225 41.538,22.692 C41.538,10.16 67.712,-0 100,-0 C132.288,-0 158.462,10.16 158.462,22.692 C158.462,35.225 132.288,45.385 100,45.385 z" fill-opacity="0" stroke="#000000" stroke-width="1"/>
    </g>
      {this.render_fill()}
    <path d="M210,127 L210,127 L210,128 L210,128 z" fill="#7B77F3"/>
    <text transform="matrix(1, 0, 0, 1, 100, 70.5)">
      <tspan x="-20.016" y="8" font-family="Lato" font-size="24" fill="#FFFFFF">{sensor.value} °C</tspan>
    </text>
    <text transform="matrix(0, -1, 1, 0, 26.538, 100)">
      <tspan x="-81.768" y="8" font-family="Lato" font-size="24" fill="#FFFFFF">{data.name}</tspan>
    </text>
  </g>
</svg>








        </ div >

    }

}

