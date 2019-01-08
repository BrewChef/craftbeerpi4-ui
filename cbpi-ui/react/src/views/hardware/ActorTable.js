import React from "react";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import BasicTable from "../../common/Table";
import {push} from "react-router-redux";
import {toggle} from "../../recucers/actor";
import classNames from "classnames";

const reducer_name = "actor"


const render_action = (row_value, column_value, row_key, column_key, props) => {


        row_value.state  = true

        let color = classNames( {
            'success': row_value.state === true,
            'danger': row_value.state === false
        });
        let icon = classNames( {
            'fa fa-toggle-on': row_value.state === true,
            'fa fa-toggle-off': row_value.state === false
        });
        return <Button size="sm" color={color} onClick={()=>{props.toggle(row_value.id)}}><i className={icon}/> </Button>
}

const mapStateToProps = (state, ownProps) => {

    return {
        cols: [
            {label: "Name", name: "name"},
            {label: "Type", name: "type"},
            {label: "Action", render: render_action}

            ],
        items: state[reducer_name].list
    }
}

const mapDispatchToProps = (dispatch, ownProps, test) => {
    return {
        sort_step: (new_order) => {
            dispatch(sort_steps(new_order))
        },
        load: () => {
            dispatch(load())
        },
        edit: (id) => {
            dispatch(push("/app/"+reducer_name+"/" + id))
        },
        toggle: (id) => {
            dispatch(toggle(id))
        }
    }
}

const ActorTable = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {withRef: true}
)(BasicTable)

export default ActorTable

