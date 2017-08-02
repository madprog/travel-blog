import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import React from 'react';
//import { SubmissionError } from 'redux-form';
import { withRouter } from 'react-router';

import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';

import { AddChipButton } from './components/ChipButton';
import AppBar from './AppBar';
import ConfirmDeleteChip from './components/ConfirmDeleteChip';
import CreateSectionForm from './CreateSectionForm';
import DialogButton from './components/DialogButton';
import * as mutations from './mutations';
import * as queries from './queries';

const SectionsIndex = ({
  data: {
    book,
    loading,
  },
  createSection,
  deleteSection,
  destroySection,
  openSection,
  undeleteSection,
}) => loading ? (
  <div className="sections-index loading">
    <CircularProgress />
  </div>
) : (
  <div className="sections-index">
    <AppBar
      next={book && book.length > 0 ? openSection(book[0]) : undefined}
      title="Index des sections"
    />
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
      {book.filter(s => !s.deleted).map(section => (
        <Chip
          key={section.id}
          onTouchTap={openSection(section)}
          onRequestDelete={process.env.ENABLE_EDITION ? deleteSection(section) : undefined}
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
    {process.env.ENABLE_EDITION && book.some(s => s.deleted) && (
      <div>
        <p>Sections supprimées (cliquer pour restaurer, supprimer pour détruire)&nbsp;:</p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {book.filter(s => s.deleted).map(section => (
            <ConfirmDeleteChip
              notificationMessage={`La section '${section.name}' va être détruite.`}
              key={section.id}
              onTouchTap={undeleteSection(section)}
              onRequestDelete={destroySection(section)}
            >
              {section.name}
            </ConfirmDeleteChip>
          ))}
        </div>
      </div>
    )}
  </div>
);

SectionsIndex.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    book: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      strId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      deleted: PropTypes.bool.isRequired,
    })),
  }).isRequired,
  createSection: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  destroySection: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  openSection: PropTypes.func.isRequired,
  undeleteSection: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createSection: (section) => ownProps.createSection({
    variables: section,
    optimisticResponse: {
      createSection: {
        __typename: 'CreateSection',
        section: {
          __typename: 'Section',
          id: -1,
          ...section,
          strId: section.name,
          deleted: false,
        },
      },
    },
  }),
  deleteSection: (section) => () => ownProps.deleteSection({
    variables: { id: section.id },
    optimisticResponse: {
      deleteSection: {
        __typename: 'DeleteSection',
        section: {
          ...section,
          deleted: true,
        },
      },
    },
  }),
  destroySection: (section) => () => ownProps.destroySection({
    variables: { id: section.id },
    optimisticResponse: {
      destroySection: {
        __typename: 'DestroySection',
        section: null,
      },
    },
  }),
  undeleteSection: (section) => () => ownProps.undeleteSection({
    variables: { id: section.id },
    optimisticResponse: {
      undeleteSection: {
        __typename: 'UndeleteSection',
        section: {
          ...section,
          deleted: false,
        },
      },
    },
  }),
  openSection: (section) => () => ownProps.history.push(`/s/${section.strId}`),
});

export default compose(
  withRouter,
  graphql(queries.book),
  mutations.createSection,
  mutations.deleteSection,
  mutations.destroySection,
  mutations.undeleteSection,
  connect(undefined, mapDispatchToProps),
)(SectionsIndex);
