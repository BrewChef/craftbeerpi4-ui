import React, {Component} from "react";
import {connect} from "react-redux";
import {Button} from "reactstrap";
import "./Dashboard.css";
import DragDummy from "./DragDummy";
import {add, load_content, move, remove, remove_dashboard, scroll, toggle_edit} from "../../recucers/dashboard";
import windowSize from "react-window-size";
import EditDashboardModal from "./EditDashboardModal";
import ConfirmModal from "../../common/ConfirmModal";
import WidgetSelectorModal from "./WidgetSelectorModal";
import {config} from "./widget";
import throttle from 'lodash.throttle';
import {push} from "react-router-redux";

@connect((state, ownProps) => {
    return {
        boxes: state.dashboard.content,
        edit: state.dashboard.edit,
        kettle: state.kettle.list,
        actor: state.actor.list,
        sensor: state.sensor.list,
        dashboard: state.dashboard.dashboards[ownProps.match.params.id],
        dbid: ownProps.match.params.id,

    }
}, (dispatch, ownProps) => {
    return {
        move: (id, data) => {
            dispatch(move(ownProps.match.params.id, id, data.x, data.y))
        },
        add: (id, data) => {
            dispatch(add(id, payload))
        },
        remove: (dbid, id) => {

            dispatch(remove(dbid, id))
        },
        load: (id) => {
            dispatch(load_content(id))
        },
        toggle_edit: () => {
            dispatch(toggle_edit())
        },
        remove_dashboard: (id) => {
            dispatch(remove_dashboard(id))
        },
        push: (path) => {
            dispatch(push(path))
        },
        scroll: (current_id) => {
            dispatch(scroll(current_id))
        }

    }
}, null, {withRef: true})
@windowSize
export default class Dashboard extends Component {

     constructor(props) {
         super(props);
        this.handleScroll = throttle(this.handleScroll.bind(this), 1000);
     }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.props.load(this.props.match.params.id)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };



    handleScroll() {
        //this.props.scroll(this.props.match.params.id)

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.load(nextProps.match.params.id)
        }
        return true;
    }

    onEnterViewport() {

    }

    onExitViewport() {

    }

    render_element(value, key) {

        if (!config[value.type]) {

            return
        }
        const Comp = config[value.type].component;
        return <Comp key={key} id={value.element_id} value={value} x={value.x} y={value.y}/>

    }

    render_elements() {
        return _.map(this.props.boxes, this.render_element.bind(this))
    }

    render_drag_elements() {
        return _.map(this.props.boxes, (value, key) => {

            if (!config[value.type]) {

                return
            }
            const Comp = config[value.type].component;

            return <DragDummy {...value} key={key}>
                <Comp dummy={true} value={value} id={value.element_id}/>
            </DragDummy>

        })
    }

    render() {

        return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', height: '100vh', width: '100%'}}>

                    <div className={this.props.edit ? "grid" : null} style={{position: 'relative', flex: 1, alignSelf: 'stretch'}}>
                        {this.props.edit ? this.render_drag_elements() : this.render_elements()}
                    </div>
                </div>
                <div style={{position: "fixed", display: 'flex', flexDirection: 'column', overflowY: "scroll", bottom: 20, right: 20, overflow: "scroll"}}>
                    {this.props.edit ? (<Button color="warning" size="sm" onClick={() => {
                        this.refs.edit_modal.wrappedInstance.show(this.props.dashboard.name)
                    }}><i className="fa fa-cogs"/> </Button>) : null }
                    <EditDashboardModal dbid={this.props.dbid} ref="edit_modal"/>
                    {this.props.edit ? (<Button color="danger" size="sm" onClick={() => {
                        this.refs.delete_confirm.wrappedInstance.toggle()
                    }}><i className="fa fa-trash"/> </Button>) : null }
                    <ConfirmModal ref="delete_confirm" title="DELETE DASHBOARD" message="ARE_YOU_SURE" confirm={() => {
                        this.props.remove_dashboard(this.props.dbid)
                    }} cancel={() => {
                    }}/>
                    {this.props.edit ? (<Button color="success" size="sm" onClick={() => {
                        this.refs.widget_modal.wrappedInstance.toggle()
                    }}><i className="fa fa-plus"/> </Button>) : null }
                    <WidgetSelectorModal ref="widget_modal" dbid={this.props.dbid}/>
                    <Button size="sm" onClick={this.props.toggle_edit}><i className="fa fa-edit"/> </Button>
                </div>
            </div>)

    }
}
