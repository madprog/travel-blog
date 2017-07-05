import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ActionHome from 'material-ui/svg-icons/action/home';

import * as navigation from './reducers/navigation';

const _AppBar = ({ history, nextPage, previousPage, title }) => (
  <AppBar
    className="app-bar"
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
          disabled={previousPage === undefined}
          onTouchTap={() => previousPage && history.push(previousPage)}
        >
          <NavigationChevronLeft />
        </IconButton>
      </div>
    }
    iconElementRight={
      <IconButton
        iconStyle={{ color: 'white' }}
        disabled={nextPage === undefined}
          onTouchTap={() => nextPage && history.push(nextPage)}
      >
        <NavigationChevronRight />
      </IconButton>
    }
  />
);

_AppBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  nextPage: PropTypes.string,
  previousPage: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { location: { pathname }, title }) => ({
  title: title || navigation.getTitle(state, pathname),
  nextPage: navigation.getNextPage(state, pathname),
  previousPage: navigation.getPreviousPage(state, pathname),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
)(_AppBar);
