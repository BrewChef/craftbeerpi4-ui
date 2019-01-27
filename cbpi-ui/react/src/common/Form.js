import React, {Component} from "react";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";
import PropTypes from "prop-types";

const Field = ({name, value, onChange, label}) => <FormGroup >
    <Label for="exampleEmail">{label}</Label>
    <Input value={value} onChange={(e) => {
        onChange(name, e)
    }} type="text" name={name} id={name}/>
</FormGroup>

Field.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

const SelectField = ({name, value, onChange, label, options}) => <FormGroup >
    <Label for="exampleEmail">{label}</Label>
    <Input value={value} onChange={(e) => {
        onChange(name, e)
    }} type="select" name={name} id="exampleEmail" placeholder="with a placeholder">
        <option value="">PLEASE SELECT</option>
        {_.map(options, (value, key) => <option key={key} value={key}>{key}</option>)}
    </Input>
</FormGroup>

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

const SelectActorField = ({name, value, onChange, label, options}) => <FormGroup >
    <Label for="exampleEmail">{label}</Label>
    <Input value={value} onChange={(e) => {
        onChange(name, e)
    }} type="select" name={name} id="exampleEmail" placeholder="with a placeholder">
        <option value="">PLEASE SELECT</option>
        {_.map(options, (value, key) => <option key={key} value={value.id}>{value.name}</option>)}
    </Input>
</FormGroup>

SelectActorField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default class BasicForm extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired
    }

    state = {data: {}, config: {}};

    componentDidMount() {

        this.setState({data: this.props.data})
    }

    onChange(name, event) {
        let v = event.target.value
        if (this.props.config[name].config) {
            let config = {}
            if (v !== "") {
                for (let k in this.props.types[v].parameter) {
                    config[k] = ""
                }
            }
            this.setState({data: {...this.state.data, [name]: event.target.value, config}})
        }
        else {
            this.setState({data: {...this.state.data, [name]: event.target.value}})
        }
    }

    onChangeConfig(name, event) {
        this.setState({data: {...this.state.data, config: {...this.state.data.config, [name]: event.target.value}}})
    }

    static  getDerivedStateFromProps(nextProps, prevState) {

        try {

            if (nextProps.data.id) {
                return {data: {...prevState.data, id: nextProps.data.id}};
            }
            else {
                return null
            }
        }
        catch (err) {
            return null
        }
    }

    reset(data) {
        this.setState({data})
    }

    get_data() {
        return {...this.state.data}

    }

    render_form() {

        return [
            <h4 key="s">Settings</h4>,
            _.map(this.props.config, (value, key) => {
                    let props = {
                        name: key,
                        value: this.state.data[key],
                        onChange: this.onChange.bind(this),
                        label: value.label, key: key
                    }

                    switch (value.type) {
                        case "select":
                            return <SelectField  {...props} options={this.props.types}/>
                        case "type":
                            return <SelectField {...props}/>
                        case "sensor":
                            return <SelectActorField {...props} options={this.props.sensor}/>
                        case "actor":
                            return <SelectActorField {...props} options={this.props.actor}/>
                        case "kettle":
                            return <SelectActorField {...props} options={this.props.kettle}/>
                        default:
                            return <Field {...props} />
                    }
                }
            )]
    }

    render_config() {

        if (!this.state.data[this.props.config_field]) {

            return
        }

        if (this.state.data[this.props.config_field] == "") {

            return
        }

        if (!this.props.types[this.state.data[this.props.config_field]]) {

            return
        }

        if (!this.props.types[this.state.data[this.props.config_field]].properties.length > 0) {

            return
        }

        return [
            <h4 key="c">Advanced Settings</h4>,
            _.map(this.props.types[this.state.data[this.props.config_field]].properties, (value, key) => {
                    if(!value.configurable) {
                        return
                    }
                    let props = {
                        name: value.name,
                        value: this.state.data.config[value.name],
                        onChange: this.onChangeConfig.bind(this),
                        label: value.label,
                        key: key
                    }
                    switch (value.type) {
                        case "select":
                            return <SelectField  {...props} options={this.props.types}/>
                        case "type":
                            return <SelectField {...props}/>
                        case "sensor":
                            return <SelectActorField {...props} options={this.props.sensor}/>
                        case "actor":
                            return <SelectActorField {...props} options={this.props.actor}/>
                        case "kettle":
                            return <SelectActorField {...props} options={this.props.kettle}/>
                        default:
                            return <Field {...props} />
                    }
                }
            )
        ]
    }

    render() {
        return (
            <Row>
                <Col>{this.render_form()}</Col>
                <Col>{this.render_config()}</Col>
            </Row>)

    }
}

//<Field key={key} label={value.label} name={value.name} value={this.state.data.config[value.name]} onChange={this.onChangeConfig.bind(this)}/>