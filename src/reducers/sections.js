import { normalize } from 'normalizr';
import typeToReducer from 'type-to-reducer';

import * as http from '../utils/http';
import * as schemas from '../schemas';

const NAME = 'canada_sections';

export const RETRIEVE_SECTIONS = `${NAME}/RETRIEVE_SECTIONS`;
export const retrieveSections = () => dispatch => dispatch({
  type: RETRIEVE_SECTIONS,
  payload: http.get('/api/sections'),
});

const initialState = {
  book: [],
  entities: {
    articles: {},
    sections: {},
  },
  loading: false,
};

export const reducer = typeToReducer({
  [RETRIEVE_SECTIONS]: {
    PENDING: (state) => ({
      ...state,
      loading: true,
    }),
    FULFILLED: (state, action) => {
      const normalized = normalize(action.payload.sections, [schemas.section]);
      return ({
        ...state,
        book: normalized.result,
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

export const getSection = (state, sectionId) => state.entities.sections[sectionId];

export const getSections = (state) => state.book
  .reduce((ret, id) => ret.concat(state.entities.sections[id]), []);

export default reducer;
