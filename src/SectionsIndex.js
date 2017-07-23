import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { SubmissionError } from 'redux-form';
import { withRouter } from 'react-router';

import Chip from 'material-ui/Chip';

import { AddChipButton } from './components/ChipButton';
import CreateSectionForm from './CreateSectionForm';
import AppBar from './AppBar';
import ConfirmDeleteChip from './components/ConfirmDeleteChip';
import DialogButton from './components/DialogButton';
import * as sections from './reducers/sections';

const SectionsIndex = ({
  history,
  createSection,
  deleteSection,
  destroySection,
  openSection,
  sections,
  undeleteSection,
}) => (
  <div className="sections-index">
    <AppBar
      next={sections && sections.length > 0 ? () => history.push(`/s/${sections[0].id}`) : undefined}
      title="Index des sections"
    />
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
      {sections.filter(s => !s.deleted).map(section => (
        <Chip
          key={section.id}
          onTouchTap={openSection(section.id)}
          onRequestDelete={process.env.ENABLE_EDITION ? deleteSection(section.id) : undefined}
        >
          {section.name}
        </Chip>
      ))}
      {process.env.ENABLE_EDITION && (
        <DialogButton
          button={AddChipButton}
          dialogTitle="Créer une section"
          form={CreateSectionForm}
          formName="createSectionForm"
          onSubmit={(section) => createSection(section)}
        />
      )}
    </div>
    {process.env.ENABLE_EDITION && sections.some(s => s.deleted) && (
      <div>
        <p>Sections supprimées (cliquer pour restaurer, supprimer pour détruire)&nbsp;:</p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {sections.filter(s => s.deleted).map(section => (
            <ConfirmDeleteChip
              notificationMessage={`La section ${section.id} va être détruite.`}
              key={section.id}
              onTouchTap={undeleteSection(section.id)}
              onRequestDelete={destroySection(section.id)}
            >
              {section.name}
            </ConfirmDeleteChip>
          ))}
        </div>
      </div>
    )}
  </div>
);

SectionsIndex.defaultProps = {
  sections: [],
};

SectionsIndex.propTypes = {
  createSection: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  destroySection: PropTypes.func.isRequired,
  openSection: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  undeleteSection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sections: sections.getSections(state),
});

const mapDispatchToProps = (dispatch, { history }) => ({
  createSection: (section) => dispatch(sections.createSection(section))
    .catch(({ response }) => Promise.reject(new SubmissionError(response.body.validationErrors))),
  deleteSection: (sectionId) => () => dispatch(sections.deleteSection(sectionId)),
  destroySection: (sectionId) => () => dispatch(sections.destroySection(sectionId)),
  openSection: (sectionId) => () => history.push(`/s/${sectionId}`),
  undeleteSection: (sectionId) => () => dispatch(sections.undeleteSection(sectionId)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(SectionsIndex);
