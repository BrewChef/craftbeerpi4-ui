import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {browserHistory} from 'react-router';
import {Button, Welcome} from '@storybook/react/demo';
import "../css/fontawesome-all.min.css";
import Sample from './sample'
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {addTranslationForLanguage, initialize, localeReducer as locale, setActiveLanguage} from "react-localize-redux";

const actor = (state = {name:"Manuel"}, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const app = combineReducers({actor, locale})

const missingTranslationMsg = '${key}';
const store = createStore(app)
store.dispatch(initialize(['en'] , { missingTranslationMsg }))
store.dispatch(addTranslationForLanguage(require('../assets/en.json'), 'en'));
store.dispatch(setActiveLanguage('en'));


export default function Provider2({ story }) {
  return (

    <Provider store={store}>
      {story}
    </Provider>
  );
};

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)
  .add('with some emoji2    ', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);



storiesOf('Chart', module)
  .addDecorator(story => <Provider2 story={story()} />)
    .add('Chart', () => <Sample/>)
