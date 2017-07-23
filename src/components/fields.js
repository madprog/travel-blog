import React from 'react';

import TextField from 'material-ui/TextField';

//eslint-disable-next-line react/prop-types
export const textField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);
