import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

const App = () => (
  <div>Hello, world of React!</div>
);

export default compose(
  connect()
)(App);
