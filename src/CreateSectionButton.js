import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';

import * as sections from './reducers/sections';

//eslint-disable-next-line react/prop-types
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

let CreateSectionForm = ({ handleSubmit, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div><Field name="name" component={renderTextField} label="Nom" autoFocus /></div>
  </form>
);

CreateSectionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const validate = values => {
  const errors = {};

  ['name'].forEach(field => {
    if (!values[field]) {
      errors[field] = 'Requis';
    }
  });

  return errors;
};

CreateSectionForm = reduxForm({
  form: 'createSectionForm',
  validate,
})(CreateSectionForm);

class CreateSectionButton extends React.Component {
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

  handleSubmit(section) {
    this.props.handleSubmit(section).then(() => {
      this.setState({ open: false });
    });
  }

  render() {
    const {
      triggerSubmit,
    } = this.props;

    return (
      <div>
        <FloatingActionButton
          onTouchTap={this.handleOpen}
          backgroundColor="#e0e0e0"
          iconStyle={{
            fill: 'rgba(0, 0, 0, 0.26)',
            height: '32px',
            width: '32px',
          }}
          zDepth={0}
        >
          <ContentAdd
            style={{
              height: '24px',
              margin: '4px',
              width: '24px',
            }}
          />
        </FloatingActionButton>
        <Dialog
          title="Créer une section"
          actions={[
            <FlatButton key="create" label="Créer" primary={true} onTouchTap={triggerSubmit} />,
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
          <CreateSectionForm
            onSubmit={this.handleSubmit}
          />
        </Dialog>
      </div>
    );
  }
}

CreateSectionButton.propTypes = {
  triggerSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  triggerSubmit: () => dispatch(submit('createSectionForm')),
  handleSubmit: (section) => dispatch(sections.createSection(section)),
});

export default compose(
  connect(undefined, mapDispatchToProps),
)(CreateSectionButton);
