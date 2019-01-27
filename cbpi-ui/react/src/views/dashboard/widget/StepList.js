import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, Card, CardHeader, ListGroup, ListGroupItem} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {bindActionCreators} from "redux";
import OptionModal from "../../../common/OptionModal";
import Countdown from "../../../common/Countdown";

@connect((state, ownProps) => ({
    type: ownProps.data.type ? state.brewing.types[ownProps.data.type] : undefined
}), (dispatch, ownProps) => ({
    actions: bindActionCreators({push, goBack}, dispatch)
}), null, {withRef: true})
class StepListItem extends Component {

    renderButton() {

        let {data, type} = this.props;

        if (data.state === 'A' && type) {
            let options = _.map(type.actions, (value, id) => ({
                label: value.label, action: () => {
                }
            }));

            return ([
                <Button size="sm" onClick={(e) => {
                    e.stopPropagation();
                    this.refs.actions.wrappedInstance.toggle()
                }}><i className="fa fa-angle-right"/></Button>,
                <OptionModal ref="actions" title="PLEASE_SELECT" options={options}/>
            ])
        }
        else {

        }
    }

    renderTimer() {
        let {data, type} = this.props;
        console.log("########PRINT TIMER", data)
        if(data.state === 'A' && data.stepstate.timer_end) {
            return  <Countdown end={data.stepstate.timer_end*1000}/>
        }

        if(data.config.timer) {
            return (<div><div><small>Timer</small></div>{data.config.timer}°</div>)
        }

    }

    render_temp() {
        let {data, type} = this.props;
        if (data.config.temp) {
            return (<div><div><small>Temp</small></div>{data.config.temp}°</div>)
        }
        else {
            return (<div></div>)
        }

    }

    render() {
        let {data, type} = this.props;
        let color = "";
        switch (data.state) {

            case "D":
                color = "info";
                break;
            case "A":
                color = "success";
                break;
            default:
                color = "";
                break;
        }

        return (<ListGroupItem color={color} >
            <div className="d-flex w-100 justify-content-between align-items-center">

                <span className="mb-1"><Button size="sm"><i className="fa fa-info-circle"/> </Button>{data.name}</span>
                {this.render_temp()}
                {this.renderTimer()}
                <small>{this.renderButton()}</small>

            </div>
        </ListGroupItem>)
    }
}

@connect((state, ownProps) => {
    return {

        steps: _.sortBy(state.brewing.list, ["order"]),
        size: _.size(state.brewing.list),
        types: state.brewing.types
    }
}, (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack}, dispatch)
    }
}, null, {withRef: true})
export default class StepList extends Component {

    render = () => {
        let {config} = this.props.value;
        let {goBack, save, add, remove} = this.props.actions;
        let width = 300;
        if (config.type && config.type == "small"){
            width = 300;
        }
        else {
            width = 500;
        }
        if (this.props.dummy) {
            return <div className="card-bg text-dark" style={{width, height: 200}}>STEP LIST</div>
        }

        let {x, y, size} = this.props;

        if (size <= 0) {
            return <div style={{position: 'absolute', top: y, left: x, width}}>
                <Card>
                    <CardHeader>
                        NO BREWING STEPS
                    </CardHeader>
                </Card>
            </div>
        }

        return <div style={{position: 'absolute', top: y, left: x, width}}>

            <ListGroup>
                {_.map(this.props.steps, (value, index) => <StepListItem data={value}/>)}
            </ListGroup>
        </div>
    }

}



