import React, {Component} from "react";
import {connect} from "react-redux";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import ParameterTable from './ParameterTable'

@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,

    }
},  (dispatch, ownProps) => {
    return {


    }
}, null, {withRef: true})
export default class Parameter extends Component {

    render () {
        return(<div><h1>Parameter</h1>
        <ParameterTable/></div>)
    }
}