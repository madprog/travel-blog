import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';

export const App = () => (
  <MuiThemeProvider>
    <AppBar
      title="Accueil"
      iconElementLeft={<div>
        <IconButton iconStyle={{ color: 'white' }}><NavigationMenu /></IconButton>
        <IconButton iconStyle={{ color: 'white' }}><NavigationChevronLeft /></IconButton>
      </div>}
      iconElementRight={<IconButton><NavigationChevronRight /></IconButton>}
    />
  </MuiThemeProvider>
);

export default compose(
  connect()
)(App);
