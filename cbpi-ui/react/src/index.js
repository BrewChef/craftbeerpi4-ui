import React, {Component} from "react";
import ReactDOM from "react-dom";


import AlertBox from "./common/AlertBox";
import registerServiceWorker from "./registerServiceWorker";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import createHistory from "history/createHashHistory";
import {Redirect, Route, Switch} from "react-router-dom";
import {Alert, Button, Container, Table} from "reactstrap";
import {ConnectedRouter, push, routerMiddleware} from "react-router-redux";
import logger from "redux-logger";
import app from "./recucers";
import "./css/fontawesome-all.min.css";
import Navigation from "./Navigation";
import {init as websocketInit} from "./websocket";
import {addTranslation, addTranslationForLanguage, initialize, setActiveLanguage} from "react-localize-redux";
import thunk from "redux-thunk";
import KettleForm from "./views/hardware/KettleForm";
import ActorForm from "./views/hardware/ActorForm";
import Plugins from "./views/plugins/Plugins"
import SensorForm from "./views/hardware/SensorForm";
import Logs from './views/logs/Logs'
import Dashboard from "./views/dashboard/Dashboard";
import Hardware from "./views/hardware/Hardware";
import Parameter from "./views/parameter/Parameter";
import ParameterForm from './views/parameter/ParameterForm'
import TankForm from "./views/hardware/TankForm";
import System from './views/system/System'
import BrewingSteps from './views/steps/Steps'
import StepForm from './views/steps/StepForm'
import RecipeBook from './views/recipe_book'
import Chart from './views/chart'
import Splash from "./splash";
import {load} from "./recucers/system";
const history = createHistory()
import {add_missing_key} from './recucers/translation'
const middleware = routerMiddleware(history)

const customMiddleWare = store => next => action => {


    if (action.type === "SYSTEM_LOAD_DATA_RECEIVED") {

        _.map(action.payload.translations, (value, key) => store.dispatch(addTranslationForLanguage(value, key)))

    }
    next(action);
}

const store = createStore(
    app,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(middleware, thunk, logger, customMiddleWare)
)

const onMissingTranslation = (key, languageCode) => {

    if(store.getState().system.ready === true) {
        store.dispatch(add_missing_key(languageCode, key))
    }

};


const missingTranslationMsg = '${key}';

store.dispatch(initialize(['en', 'de'], { missingTranslationMsg , missingTranslationCallback: onMissingTranslation}) )
store.dispatch(addTranslationForLanguage(require('./assets/en.json'), 'en'));
store.dispatch(addTranslationForLanguage(require('./assets/de.json'), 'de'));
store.dispatch(setActiveLanguage('de'));
store.dispatch(load())




websocketInit(store)

class Main extends Component {
    render() {
        return (

            <div>
                <Navigation/>
                <div className="container-fluid">
                    <Switch>
                        <Route exact path="/app" component={Hardware}/>
                        <Route exact path="/app/kettle/:id" component={KettleForm}/>
                        <Route exact path="/app/kettle/" component={KettleForm}/>
                        <Route exact path="/app/actor/:id" component={ActorForm}/>
                        <Route exact path="/app/actor/" component={ActorForm}/>
                        <Route exact path="/app/sensor/:id" component={SensorForm}/>
                        <Route exact path="/app/sensor/" component={SensorForm}/>
                        <Route exact path="/app/hardware/" component={Hardware}/>
                        <Route exact path="/app/dashboard/:id" component={Dashboard}/>
                        <Route exact path="/app/plugins/" component={Plugins}/>
                        <Route exact path="/app/parameter/" component={Parameter}/>
                        <Route exact path="/app/parameter/:name" component={ParameterForm}/>
                        <Route exact path="/app/tank/:id" component={TankForm}/>
                        <Route exact path="/app/tank/" component={TankForm}/>
                        <Route exact path="/app/system" component={System}/>
                        <Route exact path="/app/steps/" component={BrewingSteps}/>
                        <Route exact path="/app/step/:id" component={StepForm}/>
                        <Route exact path="/app/step/" component={StepForm}/>
                        <Route exact path="/app/logs/" component={Logs}/>
                        <Route exact path="/app/recipe_book" component={RecipeBook}/>
                        <Route exact path="/app/chart/:type/:id" component={Chart}/>


                    </Switch>
                </div>
            </div>

        );
    }
}

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for1 <code>{location.pathname}</code>
    </h3>
  </div>
);




const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        store.getState().system.ready ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
        )
    )}/>
)



ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={Splash}/>

                <PrivateRoute path="/app" component={Main}/>

                <AlertBox/>
            </div>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
//
registerServiceWorker();
