import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import Chip from 'material-ui/Chip';

import AppBar from './AppBar';
import CreateSectionButton from './CreateSectionButton';
import * as sections from './reducers/sections';

const SectionsIndex = ({ history, createSection, deleteSection, openSection, sections }) => (
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
          onTouchTap={openSection(section.id)}
          onRequestDelete={process.env.ENABLE_EDITION ? deleteSection(section.id) : undefined}
        >
          {section.name}
        </Chip>
      ))}
      {process.env.ENABLE_EDITION && (
        <CreateSectionButton createSection={createSection} />
      )}
    </div>
  </div>
);

SectionsIndex.defaultProps = {
  sections: [],
};

SectionsIndex.propTypes = {
  createSection: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  openSection: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  sections: sections.getSections(state),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  createSection: () => dispatch(sections.createSection()),
  deleteSection: (sectionId) => () => dispatch(sections.deleteSection(sectionId)),
  openSection: (sectionId) => () => history.push(`/s/${sectionId}`),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SectionsIndex);
