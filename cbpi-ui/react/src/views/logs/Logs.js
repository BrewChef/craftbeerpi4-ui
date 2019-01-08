import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Table, ButtonGroup, Card, CardHeader, CardTable} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {load, clear_all,clear_log} from "../../recucers/logs";
import {getActiveLanguage, getTranslate, Translate} from "react-localize-redux";
import _ from "lodash";

@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: state.logs.list

    }
}, (dispatch, ownProps) => {
    return {
        load: () => {
            dispatch(load())
        },
        clear_all: () => {
            dispatch(clear_all())
        },
        clear_log: (name) => {
            dispatch(clear_log(name))
        }

    }
}, null, {withRef: true})
export default class System extends Component {

    componentDidMount() {

        this.props.load()
    }

    render() {
        return (

            <Card>
                <CardHeader tag="h4">

                    <ButtonGroup className="float-right">
                        <Button onClick={()=>{this.props.clear_all()}} color="success"><Translate id="DELETE_ALL_LOGS"/></Button>
                    </ButtonGroup>
                </CardHeader>

                <Table>
                    <tbody>
                    {_.map(this.props.data, (value, index) => <tr>
                        <td>{value}</td>
                        <td><Button target="_blank" href={'/log/download/'+value} color="success"><i className="fa fa-download"/> </Button></td>
                        <td><Button color="danger" onClick={()=>{this.props.clear_log(value)}}><i className="fa fa-trash-alt"/></Button></td>
                    </tr>)}
                    </tbody>
                </Table>
            </Card>



        )
    }
}