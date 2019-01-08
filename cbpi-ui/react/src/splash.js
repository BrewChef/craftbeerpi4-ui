import React, {Component} from "react";
import {getActiveLanguage, getTranslate, setActiveLanguage} from "react-localize-redux";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import cbpi_logo from'./cbpi_logo.png';

@connect(
    (state, ownProps) => {

        return {
            translate: getTranslate(state.locale),
            ready: state.system.ready,
            setup: false,
            start_screen: ""
        }
    },
    (dispatch, ownProps, test) => {
        return {}
    },
    null,
    {withRef: true}
)

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {seconds: 1};
    }

    componentDidMount() {
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        this.setState({seconds: this.state.seconds - 1});
        if (this.state.seconds <= 0) {
            clearInterval(this.interval);

        }
    }

    render() {
        let {ready, setup, start_screen,translate} = this.props;
        let screen = ""


        if (ready && this.state.seconds === 0) {

            return <Redirect to={{pathname: '/app'}}/>

        }
        else {
            return (<div style={{display: 'flex', flexDirection: 'column', margin: 'auto', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
                <img src={cbpi_logo}/>
                <h2>{translate("PROJECT_NAME")}</h2>
                <span className="text-muted">loading <i className="fa fa-spinner fa-spin"/></span>
            </div>)
        }

    }
}


