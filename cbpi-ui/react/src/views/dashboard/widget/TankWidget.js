import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Card, CardBody, CardTitle} from "reactstrap";

import {goBack, push} from "react-router-redux";

import {bindActionCreators} from "redux";

const reducer_name = "tank"

const mapStateToProps = (state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: ownProps.id ? state[reducer_name].list[ownProps.id] : {},
        config: state[reducer_name].form_config,
        types: state[reducer_name].types,
        size: _.size(state[reducer_name].list)

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack}, dispatch)

    }
}

@connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
export default class TankWidget extends Component {

    render = () => {
        let {goBack, save, add, remove} = this.props.actions
        let {data, x, y, dummy} = this.props

        if(!data) {
            return <div className="not_found_bg" style={{position: 'absolute', top: y, left: x, width: 225, height: 200}}>KETTLE NOT FOUND</div>
        }


        if(dummy) {
            return <div className="card-bg" style={{width: 225, height: 200}}>{data.name}</div>
        }

        return <Card style={{position: 'absolute', top: y, left: x, width: 225, height: 200}}>
            <CardBody>
                <CardTitle>{data.name}</CardTitle>
                Fermenter
            </CardBody>
        </ Card >

    }

}


