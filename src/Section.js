import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import AppBar from './AppBar';
import * as sections from './reducers/sections';

const Section = ({ section }) => (
  <div>
    <AppBar
      title={section.name}
    />
  </div>
);

Section.defaultProps = {
  section: {},
};

const mapStateToProps = (state, { sectionId }) => ({
  section: sections.getSection(state, sectionId),
});

export default compose(
  connect(mapStateToProps)
)(Section);
