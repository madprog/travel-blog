import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import Chip from 'material-ui/Chip';

import AppBar from './AppBar';
import * as CanadaPropTypes from './PropTypes';
import * as articles from './reducers/articles';

const Section = ({ articles, history }) => (
  <div className="section">
    <AppBar />
    <div className="chips">
      {articles.map(article => (
        <Chip
          key={article.id}
          onTouchTap={() => history.push(`/a/${article.id}`)}
        >
          {article.name}
        </Chip>
      ))}
    </div>
  </div>
);

Section.propTypes = {
  articles: PropTypes.arrayOf(CanadaPropTypes.article).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state, { sectionId }) => ({
  articles: articles.getArticlesOfSection(state, sectionId),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(Section);
