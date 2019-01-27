import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, CardBody, CardTitle, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {bindActionCreators} from "redux";

@connect((state, ownProps) => {
    return {}
}, (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack}, dispatch)
    }
}, null, {withRef: true})
export default class VolumeCalc extends Component {


    state = {height: 40, diameter: 40}

    function

    calc_volume(d, h) {


        try {
            let height = parseFloat(h);
            let radius = parseFloat(d) / 2.0;

            return this.round(Math.PI * radius * radius * height / 1000.0);
        }catch(e) {
            console.error(e)
            return "NaN"
        }

    }

    round(v) {
        return ("" + (Math.round(v * 100) / 100)).replace(/\./g, ",");
    }

    render = () => {

        let {goBack, save, add, remove} = this.props.actions
        let {value} = this.props

        if (this.props.dummy) {
            return <div style={{width: 150, height: 162}} className="card-bg">Volumen Calc</div>
        }


        let {x, y} = this.props
        return <div style={{position: 'absolute', top: y, left: x, width: 150}}>
            <Card>
                <CardBody>
          <CardTitle>Volumen Calc</CardTitle>

        </CardBody>
                <CardBody>
            Height
             <InputGroup>
                 <Input value={this.state.height} onChange={(e) => { this.setState({height: e.target.value})}} type="number" id="size"/>
                 <InputGroupAddon addonType="append">
                     <InputGroupText>cm</InputGroupText>
                 </InputGroupAddon>
             </InputGroup>
            Diameter
            <InputGroup>
                 <Input value={this.state.diameter} onChange={(e) => { this.setState({diameter: e.target.value})}} type="number" id="size"/>
                 <InputGroupAddon addonType="append">
                     <InputGroupText>cm</InputGroupText>
                 </InputGroupAddon>
             </InputGroup>
            <div>Result: {this.calc_volume(this.state.diameter, this.state.height)} L</div>
                </CardBody>
            </Card>
        </div>
    }

}
