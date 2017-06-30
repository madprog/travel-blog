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
      <div>
        <Route exact={true} path="/" component={SectionsIndex} />
        <Route path="/s/:sectionName" render={({ match: { params }}) => <Section sectionId={params.sectionName} />} />
        <Route path="/a/:articleName" render={({ match: { params }}) => <Article articleId={params.articleName} />} />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default compose(
  connect()
)(App);
