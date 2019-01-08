import React, {Component} from "react";
import {Button, Table} from "reactstrap";
import {Translate} from "react-localize-redux";

export default class BasicTable extends Component {


    render_column(row_value, column_value, row_key, column_key) {
        if (column_value.render) {
            return column_value.render(row_value, column_value, row_key, column_key, this.props)
        }
        else {
            if(column_key === 0) {
                return <b onClick={()=>{this.props.edit(row_value.id)}}>{row_value[column_value.name]}</b>
            }
            else {
                return row_value[column_value.name]
            }
        }

    }

    render() {
        let {data, edit, items, cols}  = this.props

        return (
            <Table striped hover>
                <thead>
                <tr>
                    { _.map(cols, (value, key) => <th key={key}><Translate id={value.label}/></th>) }
                </tr>
                </thead>
                <tbody>
                {_.map(items, (row_value, row_key) => <tr key={row_key}>
                    {_.map(cols, (column_value, column_key) => <td key={column_key}>{this.render_column(row_value, column_value, row_key, column_key)}</td>)}
                </tr>)}
                </tbody>
            </Table>
        )
    }
}
