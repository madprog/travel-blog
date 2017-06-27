import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router'

import Chip from 'material-ui/Chip';

import AppBar from './AppBar';
import * as sections from './reducers/sections';

const Section = ({ articles, history, section }) => (
  <div>
    <AppBar
      title={section.name}
    />
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
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
  articles: sections.getArticles(state, sectionId),
  section: sections.getSection(state, sectionId),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Section);
