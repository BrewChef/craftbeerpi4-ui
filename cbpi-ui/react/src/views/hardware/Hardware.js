import React, {Component} from "react";
import {getActiveLanguage, getTranslate, Translate} from "react-localize-redux";

import {connect} from "react-redux";
import {Button, Card, CardHeader} from "reactstrap";

import {CSSTransition} from "react-transition-group";
import KettleTable from "./KettleTable";
import ActorTable from "./ActorTable";
import SensorTable from "./SensorTable";
import TankTable from "./TankTable";
import {goBack, push} from "react-router-redux";


@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,

    }
}, (dispatch, ownProps) => {
    return {

        push: (path) => {
            dispatch(push(path))
        }

    }
}, null, {withRef: true})
export default class Hardware extends Component {

    render() {
        let {translate, push} = this.props

        return (
            <div >

                    <Card>
                        <CardHeader tag="h4">
                             <Translate id="KETTLE">KETTLE</Translate>
                            <Button size="sm" color="success" className="float-right" onClick={() => {
                                push("/app/kettle")
                            }}><Translate id="ADD">ADD</Translate></Button>
                        </CardHeader>

                        <KettleTable/>
                    </Card>



                    <Card>
                        <CardHeader tag="h4"><Translate id="ACTOR">ACTOR</Translate>
                            <Button size="sm" color="success" className="float-right" onClick={() => {
                                push("/app/actor")
                            }}><Translate id="ADD">ADD</Translate></Button>
                        </CardHeader>

                        <ActorTable/>
                    </Card>
                    <Card>
                        <CardHeader tag="h4"><Translate id="SENSOR">SENSOR</Translate>
                            <Button size="sm" color="success" className="float-right" onClick={() => {
                                push("/app/sensor")
                            }}><Translate id="ADD">ADD</Translate></Button>
                        </CardHeader>

                        <SensorTable/>
                    </Card>


            </div>


        );
    }
}


