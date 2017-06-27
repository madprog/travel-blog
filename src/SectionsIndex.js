import { withRouter } from 'react-router'
import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import Chip from 'material-ui/Chip';

import AppBar from './AppBar';
import * as sections from './reducers/sections';

const SectionsIndex = ({ history, sections }) => (
  <div>
    <AppBar
      next={sections && sections.length > 0 ? () => history.push(`/s/${sections[0].id}`) : undefined}
      title="Index of sections"
    />
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
      {sections.map(section => (
        <Chip
          key={section.id}
          onTouchTap={() => history.push(`/s/${section.id}`)}
        >
          {section.name}
        </Chip>
      ))}
    </div>
  </div>
);

SectionsIndex.defaultProps = {
  sections: [],
};

const mapStateToProps = (state) => ({
  sections: sections.getSections(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(SectionsIndex);
