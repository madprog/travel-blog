import { normalize } from 'normalizr';
import request from 'superagent';
import typeToReducer from 'type-to-reducer';

import * as schemas from '../schemas';

const NAME = 'canada_templates';

export const RETRIEVE_TEMPLATES = `${NAME}/RETRIEVE_TEMPLATES`;
export const retrieveTemplates = () => dispatch => dispatch({
  type: RETRIEVE_TEMPLATES,
  payload: request
    .get('/api/templates'),
});

const initialState = {
  entities: {
    templates: {},
  },
  loading: false,
};

export const reducer = typeToReducer({
  [RETRIEVE_TEMPLATES]: {
    PENDING: (state) => ({
      ...state,
      loading: true,
    }),
    FULFILLED: (state, action) => {
      const normalized = normalize(action.payload.body.templates, [schemas.template]);
      return ({
        ...state,
        entities: {
          ...state.entities,
          ...normalized.entities,
        },
        loading: false,
      });
    },
    REJECTED: (state) => ({
      ...state,
      loading: false,
    }),
  },
}, initialState);

export const getTemplate = (state, templateId) => ((state.entities || {}).templates || {})[templateId];

export default reducer;
