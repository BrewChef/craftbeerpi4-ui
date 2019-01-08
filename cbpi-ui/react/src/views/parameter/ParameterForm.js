import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, FormGroup, Input, Label} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {save} from "../../recucers/parameter";
import {bindActionCreators} from "redux";

const reducer_name = "parameter"

const Field = ({name, value, onChange, label}) => <FormGroup >

    <Input value={value} onChange={(e) => {
        onChange(name, e)
    }} type="text" name={name} id="exampleEmail"/>
</FormGroup>

const SelectField = ({name, value, onChange, label, options}) => <FormGroup >

    <Input value={value} onChange={(e) => {
        onChange(name, e)
    }} type="select" name={name} id="exampleEmail">
        {_.map(options, (v, key) => <option key={key} value={v.value}>{v.label}</option>)}


    </Input>
</FormGroup>

const KettleField = ({name, value, onChange, label, options}) => <FormGroup >

    <Input value={value} onChange={(e) => {
        onChange(name, e)
    }} type="select" name={name} >
        <option  value="">PLEASE SELECT</option>
        {_.map(options, (v, key) => <option key={key} value={v.id}>{v.name}</option>)}


    </Input>
</FormGroup>

@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        parameter: state[reducer_name].list[ownProps.match.params.name] || {},
        kettle: state.kettle.list,
        actor: state.actor.list,
        sensor: state.sensor.list,
        tank: state.tank.list
    }
}, (dispatch, ownProps) => {
    return {actions: bindActionCreators({push, goBack, save}, dispatch)}
}, null, {withRef: true})
export default class ParameterForm extends Component {

    state = {
        value: ""
    }

    static  getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.parameter.value !== prevState.value) {
            return {value: nextProps.parameter.value};
        }
        else {
            return null
        }
    }

    onChange(name, e) {
        this.setState({value: e.target.value})
    }

    render_field() {
        let {parameter, kettle, actor, sensor, tank} = this.props;
        switch (parameter.type) {
            case "kettle":
                return <KettleField options={kettle} value={this.state.value} onChange={this.onChange.bind(this)}/>
            case "actor":
                return <KettleField options={actor} value={this.state.value} onChange={this.onChange.bind(this)}/>
            case "sensor":
                return <KettleField options={sensor} value={this.state.value} onChange={this.onChange.bind(this)}/>
            case "tank":
                return <KettleField options={tank} value={this.state.value} onChange={this.onChange.bind(this)}/>
            case "select":
                return <SelectField options={parameter.options} value={this.state.value} onChange={this.onChange.bind(this)}/>
            default:
                return <Field value={this.state.value} onChange={this.onChange.bind(this)}/>
        }
    }

    render = () => {
        let {goBack, save} = this.props.actions;
        let {parameter} = this.props;
        return <div>
            <h1>{parameter.name}</h1>
            {parameter.description}
            {this.render_field()}
            <Button onClick={goBack}><i className="fa fa-arrow-circle-left"></i></Button>
            <Button onClick={() => {save(parameter.name, this.state.value)}}><i className="fa fa-save"/></Button>
        </div>
    }

}