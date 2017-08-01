import { ApolloProvider, ApolloClient } from 'react-apollo';
import { applyMiddleware, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import injectTapEventPlugin from 'react-tap-event-plugin';
import promiseMiddleware from 'redux-promise-middleware';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';

import App from './App';
import appReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const client = new ApolloClient();
const apolloReducer = client.reducer();

const reducer = (state, action) => {
  const { apollo, form, ...appState }  = {
    apollo: undefined,
    form: undefined,
    ...state,
  };

  return {
    ...appReducer(appState, action),
    apollo: apolloReducer(apollo, action),
    form: formReducer(form, action),
  };
};

const store = createStore(reducer, composeEnhancers(applyMiddleware(
  client.middleware(),
  thunkMiddleware,
  promiseMiddleware(),
)));

injectTapEventPlugin(); // Needed for onTouchTap

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ApolloProvider client={client} store={store}>
      <App />
    </ApolloProvider>,
    document.getElementById('mount'),
  );
});
