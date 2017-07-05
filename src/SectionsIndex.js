import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import Chip from 'material-ui/Chip';

import AppBar from './AppBar';
import * as sections from './reducers/sections';

const SectionsIndex = ({ history, sections }) => (
  <div className="sections-index">
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

SectionsIndex.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  sections: sections.getSections(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(SectionsIndex);
