import reduceReducers from 'reduce-reducers';

import sections from './sections';
import templates from './templates';

export default reduceReducers(
  sections,
  templates,
);
