import React, {Component} from "react";
import {Table} from "reactstrap";
import { SortableContainer, SortableElement, SortableHandle, arrayMove} from "react-sortable-hoc";
import {Button} from "reactstrap";
import {Translate} from "react-localize-redux";
const DragHandle = SortableHandle(() => <span><i className="fa fa-bars"/></span>);

const render_column = (row_value, column_value, row_key, column_key, props) => {

    let { edit} = props;


    if (column_value.render) {
        return column_value.render(row_value, column_value, row_key, column_key, props)
    }
    else {

        if(column_key === 0) {
            return <b onClick={()=>{edit(row_value.id)}}>{row_value[column_value.name]}</b>
        }
        else {
            return row_value[column_value.name]
        }

    }
}

const SortableItem = SortableElement((props) => {
    let {row_value, row_key, index, cols, edit, row_id, sortable} = props
    return (
         <tr>
            <td style={{width: "20"}}><DragHandle/></td>
            {_.map(cols, (column_value, column_key) => <td key={column_key}>{render_column(row_value, column_value, row_key, column_key, props)} </td>)}
        </tr>
    )
}

);

const SortableList = SortableContainer(( props) => {
    let {items, cols, edit, sortable} = props
    return (
        <Table striped hover>
            <thead>
            <tr>
                <th style={{width: 50}}></th>
                { _.map(cols, (value, key) => <th key={key}><Translate id={value.label}/></th>) }
            </tr>
            </thead>
            <tbody>
            {
                _.map(items, (row_value, row_key) =>  <SortableItem key={`item-${row_key}`} {...props} index={parseInt(row_key)}  row_value={row_value}  row_key={row_key}/>)
            }
            </tbody>
        </Table>
    );
});

export default class SortableTable extends Component {

    onSortEnd({oldIndex, newIndex, collection},e) {
        let new_order = arrayMove(this.props.items, oldIndex, newIndex)
        let data = {}
        new_order.forEach((item,index)=> data[item.id] =  index )
        this.props.sort_elements(data)

    };

    render() {
        let {data, edit, columns, sortable} = this.props

        return (
            <div>
                <SortableList
                    {...this.props}
                    lockAxis="y"

                    onSortEnd={this.onSortEnd.bind(this)}
                    useDragHandle={true}/>
            </div>
        )
    }
}
