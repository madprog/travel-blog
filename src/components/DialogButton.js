import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { submit } from 'redux-form';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DialogButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleSubmit(result) {
    return this.props.onSubmit(result).then(() => {
      this.setState({ open: false });
    });
  }

  render() {
    const {
      button,
      dialogTitle,
      form,
      formName,
      triggerSubmit,
    } = this.props;

    return (
      <div>
        {React.createElement(button, { onTouchTap: this.handleOpen })}
        <Dialog
          title={dialogTitle}
          actions={[
            <FlatButton key="create" label="Soumettre" primary={true} onTouchTap={triggerSubmit} />,
            <FlatButton key="cancel" label="Annuler" primary={true} onTouchTap={this.handleClose} />,
          ]}
          actionsContainerStyle={{
            display: 'flex',
            flexDirection: 'row-reverse',
          }}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {React.createElement(form, {
            form: formName,
            onSubmit: this.handleSubmit,
          })}
        </Dialog>
      </div>
    );
  }
}

DialogButton.propTypes = {
  button: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  form: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  triggerSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, { formName }) => ({
  triggerSubmit: () => dispatch(submit(formName)),
});

export default compose(
  connect(undefined, mapDispatchToProps),
)(DialogButton);
