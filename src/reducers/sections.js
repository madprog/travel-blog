import { normalize } from 'normalizr';
import request from 'superagent';
import typeToReducer from 'type-to-reducer';

import * as schemas from '../schemas';

const NAME = 'canada_sections';

export const CREATE_SECTION = `${NAME}/CREATE_SECTION`;
export const createSection = (section) => dispatch => dispatch({
  type: CREATE_SECTION,
  meta: { section },
  payload: request
    .post('/api/sections')
    .send(section),
});

export const DELETE_SECTION = `${NAME}/DELETE_SECTION`;
export const deleteSection = (sectionId) => dispatch => dispatch({
  type: DELETE_SECTION,
  meta: { sectionId },
  payload: request
    .del(`/api/sections/${sectionId}`),
});

export const DESTROY_SECTION = `${NAME}/DESTROY_SECTION`;
export const destroySection = (sectionId) => dispatch => dispatch({
  type: DESTROY_SECTION,
  meta: { sectionId },
  payload: request
    .del(`/api/sections/${sectionId}?destroy=true`),
});

export const RETRIEVE_SECTIONS = `${NAME}/RETRIEVE_SECTIONS`;
export const retrieveSections = () => dispatch => dispatch({
  type: RETRIEVE_SECTIONS,
  payload: request
    .get('/api/sections'),
});

export const UNDELETE_SECTION = `${NAME}/UNDELETE_SECTION`;
export const undeleteSection = (sectionId) => dispatch => dispatch({
  type: UNDELETE_SECTION,
  meta: { sectionId },
  payload: request
    .patch(`/api/sections/${sectionId}`, { deleted: false }),
});

const initialState = {
  book: [],
  entities: {
    articles: {},
    sections: {},
  },
  loading: false,
};

const receiveBookReducer = {
  PENDING: (state) => ({
    ...state,
    loading: true,
  }),
  FULFILLED: (state, action) => {
    const normalized = normalize(action.payload.body.sections, [schemas.section]);
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
};

export const reducer = typeToReducer({
  [CREATE_SECTION]: receiveBookReducer,
  [DELETE_SECTION]: receiveBookReducer,
  [DESTROY_SECTION]: receiveBookReducer,
  [RETRIEVE_SECTIONS]: receiveBookReducer,
  [UNDELETE_SECTION]: receiveBookReducer,
}, initialState);

export const getSection = (state, sectionId) => state.entities.sections[sectionId];

export const getSections = (state) => state.book
  .reduce((ret, id) => ret.concat(state.entities.sections[id]), []);

export default reducer;
