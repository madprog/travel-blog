import { compose } from 'redux';
import React from 'react';
import { withRouter } from 'react-router'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ActionHome from 'material-ui/svg-icons/action/home';

const _AppBar = ({ history, next, previous, title }) => (
  <AppBar
    title={title}
    iconElementLeft={
      <div>
        <IconButton
          iconStyle={{ color: 'white' }}
          onTouchTap={() => history.push('/')}
        >
          <ActionHome />
        </IconButton>
        <IconButton
          iconStyle={{ color: 'white' }}
          disabled={previous === undefined}
          onTouchTap={previous}
        >
          <NavigationChevronLeft />
        </IconButton>
      </div>
    }
    iconElementRight={
      <IconButton
        iconStyle={{ color: 'white' }}
        disabled={next === undefined}
        onTouchTap={next}
      >
        <NavigationChevronRight />
      </IconButton>
    }
  />
);

export default compose(
  withRouter
)(_AppBar);
