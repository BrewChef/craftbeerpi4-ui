import React, {Component} from "react";
import {getActiveLanguage, getTranslate, Translate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {add, remove_dashboard, toggle_edit} from "../../recucers/dashboard";
import classNames from "classnames";
import {config} from "./widget";

@connect((state, ownProps) => {
    return {
        edit: state.dashboard.edit,
        dashboard: state.dashboard.dashboards[ownProps.dasboard_id],

    }
}, (dispatch, ownProps) => {
    return {

        add: (id, data) => {
            dispatch(add(id, data))
        },
        toggle: () => {
            dispatch(toggle_edit())
        },
        remove_dashboard: (id) => {
            dispatch(remove_dashboard(id))
        }

    }
}, null, {withRef: true})
export default class WidgetSelectorModal extends Component {

    state = {modal: false}

    toggle() {
        this.setState({
            modal: !this.state.modal,
            activeTab: '1'
        });
    }

    toggle_tab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    save() {
        this.props.add(this.props.dbid, {type: "text", config: {text: this.state.text, size: parseInt(this.state.size)}})
        this.setState({text: "", size: 15})
        this.toggle()
    }

    render() {

        let {dbid} = this.props
        return (
            <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>WIDGET SELECT</ModalHeader>
                <ModalBody>

                    <div style={{display: 'flex'}}>
                        <div style={{flex: 1}}></div>
                    </div>


                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classNames({active: this.state.activeTab === '1'})}
                                onClick={() => {
                                    this.toggle_tab('1');
                                }}
                            >
                                Brewing
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classNames({active: this.state.activeTab === '2'})}
                                onClick={() => {
                                    this.toggle_tab('2');
                                }}
                            >
                                Fermentation
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classNames({active: this.state.activeTab === '2'})}
                                onClick={() => {
                                    this.toggle_tab('2');
                                }}
                            >
                                Other
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="d-flex  flex-wrap">


                                {_.map(config, (value, key) => {
                                        if (value.dialog) {
                                            const Modal = value.dialog
                                            return (<div key={key} className="w-25">
                                                <Button block onClick={() => {
                                                    this.refs[key].wrappedInstance.toggle()
                                                }}>{value.name}</Button>
                                                <Modal dbid={dbid} ref={key}/>
                                            </div>)
                                        }
                                        else {
                                            return (<div key={key} className="w-25"><Button block onClick={() => {
                                                this.props.add(dbid, {type: key, config: {}})
                                            }}>{value.name}</Button></div>)
                                        }

                                    }
                                )}
                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                            HALL
                        </TabPane>
                    </TabContent>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle.bind(this)}><Translate id="DONE"/></Button>

                </ModalFooter>
            </Modal>
        )
    }
}
