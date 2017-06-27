import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

const Section = () => (
  <div>Section!</div>
);

export default compose(
  connect()
)(Section);
