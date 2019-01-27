import React, {Component} from "react";
import {Translate} from "react-localize-redux";
import {connect} from "react-redux";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {add} from "../../recucers/dashboard";
import classNames from "classnames";
import {config} from "./widget";
import {bindActionCreators} from "redux";

@connect((state, ownProps) => {
    return {
        edit: state.dashboard.edit,
        dashboard: state.dashboard.dashboards[ownProps.dasboard_id],
    }
}, (dispatch, ownProps) => {
    return {
        actions: bindActionCreators({add}, dispatch),
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
        this.props.action.add(this.props.dbid, {type: "text", config: {text: this.state.text, size: parseInt(this.state.size)}})
        this.setState({text: "", size: 15})
        this.toggle()
    }

    render() {

        let {dbid} = this.props
        return (
            <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}><Translate id="SELECT_WIDGET"/></ModalHeader>
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
                                <Translate id="WIDGET_BREWING"/>
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
                                                this.props.actions.add(dbid, {type: key, config: {}})
                                            }}>{value.name}</Button></div>)
                                        }

                                    }
                                )}
                            </div>
                        </TabPane>
                        <TabPane tabId="2">

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
