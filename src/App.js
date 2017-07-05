import { BrowserRouter as Router, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Article from './Article';
import SectionsIndex from './SectionsIndex';
import Section from './Section';

export const App = () => (
  <MuiThemeProvider>
    <Router>
      <div className="app">
        <Route exact={true} path="/" component={SectionsIndex} />
        <Route path="/s/:sectionId" render={({ match: { params }}) => <Section sectionId={params.sectionId} />} />
        <Route path="/a/:articleId" render={({ match: { params }}) => <Article articleId={params.articleId} />} />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default compose(
  connect(),
)(App);
