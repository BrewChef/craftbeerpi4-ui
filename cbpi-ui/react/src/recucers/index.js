import {combineReducers} from "redux";
import { routerReducer} from "react-router-redux";
import { localeReducer as locale } from 'react-localize-redux';
import session from './session'
import alert from './alert'
import dashboard from './dashboard'
import kettle from "./kettle"
import actor from "./actor"
import sensor from "./sensor"
import system from './system'
import tank from './tank'
import parameter from './parameter'
import plugins from './plugins'
import brewing from './brewing'
import logs from './logs'
import chart from './chart'
const app = combineReducers({
    screen,
    alert,
    session,
    tank,
    chart,
    plugins,
    logs,
    brewing,
    kettle,
    actor,
    system,
    parameter,
    dashboard,
    sensor,
    router: routerReducer,
    locale

})

export default app