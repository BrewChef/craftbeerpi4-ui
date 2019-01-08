import React, {Component} from "react";
import {Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {logout} from "./recucers/session";
import {getActiveLanguage, getTranslate, setActiveLanguage} from "react-localize-redux";
import _ from "lodash";
import NewDashboardModal from './views/dashboard/NewDashboardModal'
import {toggle_edit} from "./recucers/dashboard";
import "./Navigation.css";
import logo from './cbpi_logo_small.png'

@connect(
    (state, ownProps) => {
    return {
        pathname: state.router.location.pathname,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        isAuthenticated: state.session.isAuthenticated,

        dashboards: state.dashboard.dashboards
    }
},
    (dispatch, ownProps) => {
    return {
        push: (path) => {
            dispatch(push(path))
        },
        setActiveLanguage: (locale) => {
            dispatch(setActiveLanguage(locale))
        },
        logout: () => {
            dispatch(logout())
        },
        toggle_edit: () => {
            dispatch(toggle_edit())
        },

    }
},
    null,
    {withRef: true}
)
export default class Navigation extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let {translate, dashboards, pathname, setActiveLanguage, currentLanguage, isAuthenticated, logout} = this.props

        const items = [
            {name: "D", path: "/sk/playlist"}
        ]



        return (

            <Navbar fixed="top" color="light" className="navbar-static-top" light expand="md">
                <img src={logo}/>
                <NavbarBrand href="/">{translate("PROJECT_NAME")}</NavbarBrand>

                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>


                        <NavItem >
                                <NavLink onClick={() => {
                                    this.props.push("/app/steps")
                                }}>Brewing Steps</NavLink>
                            </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Dashboard
                            </DropdownToggle>
                            <DropdownMenu right>
                                {_.map(dashboards, (value, key) => <DropdownItem key={key} onClick={() => {
                                    this.props.push("/app/dashboard/"+value.id)
                                }}>
                                       <i className="fa fa-tv"/> {value.name || "NO NAME"}
                                </DropdownItem>
                                )}
                                <DropdownItem onClick={() => {
                                    this.refs.new_dasboard.wrappedInstance.toggle()
                                }}>
                                    <i className="fa fa-plus"/> New Dashboard
                                    <NewDashboardModal ref="new_dasboard"/>
                                </DropdownItem>


                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                System
                            </DropdownToggle>
                            <DropdownMenu right>


                                <DropdownItem onClick={() => {
                                    this.props.push("/app")
                                }}>
                                    Hardware
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                    this.props.push("/app/plugins")
                                }}>
                                    Plugins
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                    this.props.push("/app/parameter")
                                }}>
                                    Parameter
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                    this.props.push("/app/steps")
                                }}>
                                    Brewing Steps
                                </DropdownItem>
                                 <DropdownItem onClick={() => {
                                    this.props.push("/app/logs")
                                }}>
                                    Logs
                                </DropdownItem>
                                <DropdownItem onClick={() => {
                                    this.props.push("/app/system")
                                }}>
                                    System
                                </DropdownItem>


                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </Nav>


                </Collapse>
            </Navbar>

        );
    }
}

/*
{_.map(items, (value, key) => <NavItem key={key}>
                                <NavLink onClick={() => {
                                    this.props.push(value.path)
                                }}>{value.name}</NavLink>
                            </NavItem>
                        )}
 */




