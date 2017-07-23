import PropTypes from 'prop-types';
import React from 'react';

import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';

export default class ConfirmDeleteChip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.handleActionTouchTap = this.handleActionTouchTap.bind(this);
  }

  handleRequestClose() {
    this.props.onRequestDelete();
    this.setState({ open: false });
  }

  handleRequestDelete() {
    this.setState({ open: true });
  }

  handleActionTouchTap(ev) {
    ev.stopPropagation();
    this.setState({ open: false });
  }

  render() {
    const { children, notificationMessage, onRequestDelete, ...otherProps } = this.props;

    return (
      <Chip
        {...otherProps}
        onRequestDelete={onRequestDelete ? this.handleRequestDelete : undefined}
      >
        {children}
        <Snackbar
          open={this.state.open}
          message={notificationMessage}
          action="Annuler"
          autoHideDuration={2500}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />
      </Chip>
    );
  }
}

ConfirmDeleteChip.propTypes = {
  children: PropTypes.node,
  notificationMessage: PropTypes.string.isRequired,
  onRequestDelete: PropTypes.func,
};
