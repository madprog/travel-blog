import { applyMiddleware, compose, createStore } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import promiseMiddleware from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';

import App from './App';
import reducer from './reducers';
import * as sections from './reducers/sections';
import * as templates from './reducers/templates';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(
  thunkMiddleware,
  promiseMiddleware(),
)));

injectTapEventPlugin(); // Needed for onTouchTap
store.dispatch(sections.retrieveSections());
store.dispatch(templates.retrieveTemplates());

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('mount'),
  );
});
