import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, ButtonGroup, CardHeader, Card} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {getActiveLanguage, getTranslate, Translate} from "react-localize-redux";
import StepTable from "./StepTable";
import {OptionModal,ConfirmModal} from "../../common";
import BrewNameModal from "./BrewNameModal";
import {get_parameter} from '../../recucers/parameter'
import {remove_all,save_recipe} from '../../recucers/brewing'



@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: state.brewing.list,
        is_brewing: _.find(state.brewing.list, (e => e.state === 'A')),
        loading: state.plugins.loading,
        recipe_name: "ALE",
        name: get_parameter(state, "NAME", "")


    }
}, (dispatch, ownProps) => {
    return {
        push: (path) => {
            dispatch(push(path))
        },
        remove_all: () => {
            dispatch(remove_all())
        },
        save_recipe: () => {
            dispatch(save_recipe())
        }
    }
}, null, {withRef: true})
export default class BrewingSteps extends Component {

    render() {


        const recipe_book_options = [
            {label:"Recipe Book", action: ()=> {this.props.push("/app/recipe_book")}},
            {label:"Import Beer XML", action: ()=> {}},
            {label:"Import Malz & Mehr", action: ()=> {}}
        ]


        return (
            <div>
                <Card>
                        <CardHeader tag="h4">
                            <Button onClick={()=>{this.refs.brew_name_modal.wrappedInstance.show(this.props.name)}}>{this.props.name} <i className="fa fa-edit"/> </Button>
                            <BrewNameModal ref="brew_name_modal"/>
                            <ButtonGroup className="float-right" >
                                <Button disabled={this.props.is_brewing} color="success" onClick={()=>{this.props.save_recipe()}}><Translate id="SAVE_RECIPIE"/></Button>
                                <Button disabled={this.props.is_brewing} color="danger" onClick={()=> {this.refs.clear_confirm_modal.wrappedInstance.toggle()}}><Translate id="CLEAR_STEPS"/></Button>
                                <Button disabled={this.props.is_brewing} color="warning" onClick={() => { this.refs.recipe_modal.wrappedInstance.toggle()}}><Translate id="RECIPIE_BOOK"/></Button>
                                <Button color="success" onClick={() => { this.props.push("/app/step") }}><Translate id="ADD"/></Button>
                            </ButtonGroup>
                            <ConfirmModal ref="clear_confirm_modal" title="CLEAR_ALL_STEPS" message="ARE_YOU_SURE" confirm={()=>{this.props.remove_all()}} cancel={()=>{}}/>
                            <OptionModal ref="recipe_modal" cancel title="PLEASE SELECT" options={recipe_book_options}/>
                        </CardHeader>

                        <StepTable/>
                    </Card>



            </div>
        )
    }
}