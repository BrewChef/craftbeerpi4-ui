import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {start, reset_all, reset_current} from "../../../recucers/brewing";
import {bindActionCreators} from "redux";
import ConfirmModal from "../../../common/ConfirmModal";

const reducer_name = "sensor"

@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: ownProps.id ? state[reducer_name].list[ownProps.id] : {},
        config: state[reducer_name].form_config,
        types: state[reducer_name].types,
        is_brewing: _.find(state.brewing.list, (e => e.state === 'A' || e.state === 'D' )),
        is_brewing_active: _.find(state.brewing.list, (e => e.state === 'A')),
        steps: _.sortBy(state.brewing.list, ["order"]),
        size: _.size(state[reducer_name].list)
    }
}, (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack, start, reset_all, reset_current}, dispatch)

    }
}, null, {withRef: true})
export default class StepControls extends Component {

    render = () => {
        let {goBack, save, add, remove, start, reset_all} = this.props.actions
        let { x, y, dummy, is_brewing, is_brewing_active} = this.props

        if(dummy) {
            return <div className="card-bg" style={{width: 225, height: 48}}>STEP Control</div>
        }

        return <div style={{position: 'absolute', top: y, left: x, width: 225}}>

                { !is_brewing ? (<Button color="success" onClick={start.bind(this)}><i className="fa fa-play"/> </Button>) :null}
               { is_brewing_active ? (<Button color="warning"  onClick={start.bind(this)} ><i className="fa fa-forward"/> </Button>) : null}
                {is_brewing ? (<Button color="danger"  onClick={()=>{this.refs.confirm_reset.wrappedInstance.toggle()}}><i className="fa fa-reply-all"/> </Button>) :null}

                <ConfirmModal ref="confirm_reset" title="STOP_BREWING" message="ARE_YOU_SURE" confirm={()=>{this.props.actions.reset_all()}} cancel={()=>{}}/>
        </div>
    }

}


