import React, {Component} from "react";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import BasicForm from "../../common/Form";
import {goBack, push} from "react-router-redux";
import {add, remove, save} from "../../recucers/actor";
import {bindActionCreators} from "redux";
import ConfirmModal from '../../common/ConfirmModal';

const reducer_name = "actor"

const mapStateToProps = (state, ownProps) => {
    return {

        data: ownProps.match.params.id ? state[reducer_name].list[ownProps.match.params.id] : {},
        config: {
            name: {label: "Name", type: "text"},
            type: {label: "Type", type: "select", config: true}
        },
        types: state[reducer_name].types

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        actions: bindActionCreators({push, goBack, save, add, remove}, dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
export default class ActorForm extends Component {

    render = () => {
        let {goBack, save, add, remove} = this.props.actions
                return <div>
                    <BasicForm ref="form" {...this.props} config_field="type" />
                    <Button onClick={goBack}><i className="fa fa-arrow-circle-left"></i></Button>
                    {this.props.match.params.id ? (<Button onClick={()=> {save(this.props.match.params.id, this.refs.form.get_data())}}><i className="fa fa-save"/></Button>) : null }
                    {this.props.match.params.id ? (<Button onClick={()=> {this.refs.delete_confirm.wrappedInstance.toggle()}}><i className="fa fa-trash-alt"/></Button>) : null }
                    {!this.props.match.params.id ? (<Button onClick={()=> {add(this.refs.form.get_data())}}><i className="fa fa-plus"/></Button>) : null }
                    <ConfirmModal ref="delete_confirm" title="DELETE ACTOR" message="ARE_YOU_SURE" confirm={()=> {remove(this.props.match.params.id)}} cancel={()=>{}}/>
                    </div>
        }


}