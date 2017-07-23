import { reducer as formReducer } from 'redux-form';
import reduceReducers from 'reduce-reducers';

import sections from './sections';
import templates from './templates';

export default reduceReducers(
  sections,
  templates,
  (state, action) => ({
    ...state,
    form: formReducer(state.form, action),
  }),
);
