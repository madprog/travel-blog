import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router'

import Chip from 'material-ui/Chip';

import AppBar from './AppBar';
import * as articles from './reducers/articles';

const Article = ({ history, article }) => (
  <div>
    <AppBar />
    <h1>{article.name}</h1>
  </div>
);

Article.defaultProps = {
  article: {},
};

const mapStateToProps = (state, { articleId }) => ({
  article: articles.getArticle(state, articleId),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Article);
