import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Provider as ReduxProvider } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button, Welcome } from '@storybook/react/demo';
import app from '../recucers'
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import KettleTable from '../views/hardware/KettleTable'
import payload from './dummy_payload'
import KettleWidget from "../views/dashboard/widget/KettleWidget";
import logger from "redux-logger";
import "../css/fontawesome-all.min.css";
import {addTranslation, addTranslationForLanguage, initialize, setActiveLanguage} from "react-localize-redux";
import Chart from './ChartDemo'
const store = createStore(
    app,
    applyMiddleware(thunk,logger)
)

const languages = ['en', 'de'];
store.dispatch(initialize(languages));
store.dispatch(addTranslationForLanguage(require('../assets/en.json'), 'en'));
store.dispatch(addTranslationForLanguage(require('../assets/de.json'), 'de'));

store.dispatch(setActiveLanguage('de'));

store.dispatch({type:"SYSTEM_LOAD_DATA_RECEIVED", payload})

export default function Provider({ story }) {
  return (
    <ReduxProvider store={store}>
      {story}
    </ReduxProvider>
  );
};

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)

  .add('with some emoji2    ', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);



storiesOf('Chart', module)
  .addDecorator(story => <Provider story={story()} />)
    .add('Chart', () => <Chart/>)
