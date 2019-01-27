import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Table} from "reactstrap";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import {get_recipes, load_recipe} from '../../recucers/brewing'

@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: state.brewing.recipes
    }
},  (dispatch, ownProps) => {
    return {
        load: () => {dispatch(get_recipes())},
        load_recipe: (name) => {console.log("#######",name); dispatch(load_recipe(name))}
    }
}, null, {withRef: true})
export default class RecipeBook extends Component {

    componentDidMount() {
        this.props.load(this.props.match.params.id)
    }


    render () {
        return(<div>

            <Table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Load</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                     {_.map(this.props.data, (value, key) => <tr key={key}>
                         <td>{value}</td>
                         <td><Button onClick={()=>{console.log("HALLO"); this.props.load_recipe(value)}}><i className="fa fa-upload" /> </Button></td>
                         <td><Button><i className="fa fa-trash"/> </Button></td></tr> )}
                </tbody>
            </Table>

        </div>)
    }
}