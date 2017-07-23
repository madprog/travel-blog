import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import * as fields from './components/fields';

const CreateSectionForm = ({ handleSubmit, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div><Field name="name" component={fields.textField} label="Nom" autoFocus /></div>
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

export default reduxForm({
  validate,
})(CreateSectionForm);
