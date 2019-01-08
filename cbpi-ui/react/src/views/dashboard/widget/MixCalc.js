import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, ButtonGroup, Card, CardBody, CardTitle, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {bindActionCreators} from "redux";

@connect((state, ownProps) => {
    return {}
}, (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({push, goBack}, dispatch)
    }
}, null, {withRef: true})
export default class MixCalc extends Component {


    state = {gv: 20, gt: 15, st: 0, dt: 12}



    calc(given_vol, given_temp, sup_temp, dest_temp) {
        try {

            let gv = parseFloat(given_vol);
            let gt = parseFloat(given_temp);
            let st = parseFloat(sup_temp);
            let dt = parseFloat(dest_temp)
            let x = (-gv + (gv * gt) / dt) / (1 - (st / dt));

            return this.round(x)
        } catch (e) {
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
            return <div style={{width: 200, height: 361}} className="card-bg">Mischkreutz</div>
        }


        let {x, y} = this.props
        return <div style={{position: 'absolute', top: y, left: x, width: 200}}>
            <Card>
                <CardBody>
          <CardTitle>Mischkreutz</CardTitle>

        </CardBody>
                <CardBody>
            Volumen Given Liquid
             <InputGroup>
                 <Input value={this.state.gv} onChange={(e) => { this.setState({gv: e.target.value})}} type="number" id="size"/>
                 <InputGroupAddon addonType="append">
                     <InputGroupText>L</InputGroupText>
                 </InputGroupAddon>
             </InputGroup>
            Temperature Given Liquid
            <InputGroup>
                 <Input value={this.state.gt} onChange={(e) => { this.setState({gt: e.target.value})}} type="number" id="size"/>
                 <InputGroupAddon addonType="append">
                     <InputGroupText>°C</InputGroupText>
                 </InputGroupAddon>
             </InputGroup>
            Temperature Hot Water
            <InputGroup>
                 <Input value={this.state.st} onChange={(e) => { this.setState({st: e.target.value})}} type="number" id="size"/>
                 <InputGroupAddon addonType="append">
                     <InputGroupText>°C</InputGroupText>
                 </InputGroupAddon>
             </InputGroup>
            Target Temp
            <InputGroup>
                 <Input value={this.state.dt} onChange={(e) => { this.setState({dt: e.target.value})}} type="number" id="size"/>
                 <InputGroupAddon addonType="append">
                     <InputGroupText>°C</InputGroupText>
                 </InputGroupAddon>
             </InputGroup>
            <div>Add: {this.calc(this.state.gv, this.state.gt, this.state.st, this.state.dt)} L</div>
                </CardBody>
            </Card>
        </div>
    }

}
