import { compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';

import { AddChipButton } from './components/ChipButton';
import AppBar from './AppBar';
import ConfirmDeleteChip from './components/ConfirmDeleteChip';
import CreateArticleForm from './CreateArticleForm';
import DialogButton from './components/DialogButton';
import * as mutations from './mutations';
import * as queries from './queries';

const Section = ({
  data: {
    error,
    loading,
    section,
  },
  createArticle,
  deleteArticle,
  destroyArticle,
  openArticle,
  undeleteArticle,
}) => loading ? (
  <div className="section loading">
    <CircularProgress />
  </div>
) : error ? (
  <pre>{error.message}</pre>
) : (
  <div className="section">
    <AppBar
      title={section.name}
    />
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
      {section.articles.filter(a => !a.deleted).map(article => (
        <Chip
          key={article.id}
          onTouchTap={openArticle(article)}
          onRequestDelete={process.env.ENABLE_EDITION ? deleteArticle(article) : undefined}
        >
          {article.name}
        </Chip>
      ))}
      {process.env.ENABLE_EDITION && (
        <DialogButton
          button={AddChipButton}
          dialogTitle="Créer un article"
          form={CreateArticleForm}
          formName="createArticleForm"
          onSubmit={(article) => createArticle(article)}
        />
      )}
    </div>
    {process.env.ENABLE_EDITION && section.articles.some(a => a.deleted) && (
      <div>
        <p>Articles supprimés (cliquer pour restaurer, supprimer pour détruire)&nbsp;:</p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {section.articles.filter(a => a.deleted).map(article => (
            <ConfirmDeleteChip
              notificationMessage={`L'article '${article.name}' va être détruit.`}
              key={article.id}
              onTouchTap={undeleteArticle(article)}
              onRequestDelete={destroyArticle(article)}
            >
              {article.name}
            </ConfirmDeleteChip>
          ))}
        </div>
      </div>
    )}
  </div>
);

Section.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
    section: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      articles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        strId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        deleted: PropTypes.bool.isRequired,
      })).isRequired,
    }),
  }).isRequired,
  createArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  destroyArticle: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  openArticle: PropTypes.func.isRequired,
  undeleteArticle: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createArticle: (article) => ownProps.createArticle({
    variables: {...article, sectionId: ownProps.data.section.id },
    optimisticResponse: {
      createArticle: {
        __typename: 'CreateArticle',
        article: {
          __typename: 'Article',
          id: -1,
          ...article,
          strId: article.name,
          deleted: false,
          sectionId: ownProps.data.section.id,
        },
      },
    },
  }),
  deleteArticle: (article) => () => ownProps.deleteArticle({
    variables: { id: article.id },
    optimisticResponse: {
      deleteArticle: {
        __typename: 'DeleteArticle',
        article: {
          ...article,
          deleted: true,
        },
      },
    },
  }),
  destroyArticle: (article) => () => ownProps.destroyArticle({
    variables: { id: article.id },
    optimisticResponse: {
      destroyArticle: {
        __typename: 'DestroyArticle',
        article: null,
      },
    },
  }),
  undeleteArticle: (article) => () => ownProps.undeleteArticle({
    variables: { id: article.id },
    optimisticResponse: {
      undeleteArticle: {
        __typename: 'DeleteArticle',
        article: {
          ...article,
          deleted: false,
        },
      },
    },
  }),
  openArticle: (article) => () => ownProps.history.push(`/a/${article.strId}`),
});

export default compose(
  withRouter,
  graphql(queries.section, { options: ({ sectionId }) => ({
    variables: { strId: sectionId },
  }) }),
  mutations.createArticle,
  mutations.deleteArticle,
  mutations.destroyArticle,
  mutations.undeleteArticle,
  connect(undefined, mapDispatchToProps),
)(Section);
