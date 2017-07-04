import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router'

import Chip from 'material-ui/Chip';

import AppBar from './AppBar';
import * as articles from './reducers/articles';
import * as sections from './reducers/sections';

const Section = ({ articles, history, section }) => (
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

Section.defaultProps = {
  section: {},
};

const mapStateToProps = (state, { sectionId }) => ({
  articles: articles.getArticlesOfSection(state, sectionId),
  section: sections.getSection(state, sectionId),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Section);
