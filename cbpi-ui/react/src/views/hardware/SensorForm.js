import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, Card, CardBody, CardTitle, CardHeader, CardFooter} from "reactstrap";
import DSForm from "../../common/Form";
import {push, goBack} from "react-router-redux";
import {save, add, remove} from "../../recucers/sensor";
import {bindActionCreators} from "redux";
import BasicForm from "../../common/Form";
const reducer_name = "sensor"
import ConfirmModal from '../../common/ConfirmModal';

const mapStateToProps = (state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: ownProps.match.params.id ? state[reducer_name].list[ownProps.match.params.id] : {},
        config: {
            name: {label: "Name", type: "text"},
            type: {label: "Type", type: "select", config: true}
        },
        types: state[reducer_name].types,
        actor: state.actor.list,
        sensor: state.sensor.list,
        kettle: state.kettle.list

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        actions: bindActionCreators({push, goBack, save, add, remove}, dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
export default class SensorForm extends Component {

    render = () => {
        let {goBack, save, add, remove} = this.props.actions
                return <Card>
                    <CardHeader tag="h4">Sensor Settings</CardHeader>
                    <CardBody>
                        <BasicForm ref="form" {...this.props} config_field="type" />
                    </CardBody>
                    <CardFooter>
                        <Button onClick={goBack}><i className="fa fa-arrow-circle-left"/></Button>
                    {this.props.match.params.id ? (<Button onClick={()=> {save(this.props.match.params.id, this.refs.form.get_data())}}><i className="fa fa-save"/></Button>) : null }
                    {this.props.match.params.id ? (<Button onClick={()=> {this.refs.delete_confirm.wrappedInstance.toggle()}}><i className="fa fa-trash-alt"/></Button>) : null }
                    {!this.props.match.params.id ? (<Button onClick={()=> {add(this.refs.form.get_data())}}><i className="fa fa-plus"/></Button>) : null }
                    <ConfirmModal ref="delete_confirm" title="DELETE ACTOR" message="ARE_YOU_SURE" confirm={()=> {remove(this.props.match.params.id)}} cancel={()=>{}}/>

                    </CardFooter>
                    </Card>
        }


}