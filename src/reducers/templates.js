import { normalize } from 'normalizr';
import typeToReducer from 'type-to-reducer';

import * as http from '../utils/http';
import * as schemas from '../schemas';

const NAME = 'canada_templates';

export const RETRIEVE_TEMPLATES = `${NAME}/RETRIEVE_TEMPLATES`;
export const retrieveTemplates = () => dispatch => dispatch({
  type: RETRIEVE_TEMPLATES,
  payload: http.get('/api/templates'),
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
      const normalized = normalize(action.payload.templates, [schemas.template]);
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
