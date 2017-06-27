import React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

const _AppBar = ({ next, previous, title }) => (
  <AppBar
    title={title}
    iconElementLeft={
      <div>
        <IconButton iconStyle={{ color: 'white' }}>
          <NavigationMenu />
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

export default _AppBar;
