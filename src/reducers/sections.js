import typeToReducer from 'type-to-reducer';

import * as http from '../utils/http';

const NAME = 'canada_sections';

export const RETRIEVE_SECTIONS = `${NAME}/RETRIEVE_SECTIONS`;
export const retrieveSections = () => dispatch => dispatch({
  type: RETRIEVE_SECTIONS,
  payload: http.get('/api/sections'),
});

const initialState = {
  entities: {
    sections: {},
  },
};

export const reducer = typeToReducer({
  [RETRIEVE_SECTIONS]: {
    PENDING: (state) => ({
      ...state,
      entities: {
        ...state.entities,
        sections: {
          ...state.entities.sections,
          _loading: true,
        },
      },
    }),
    FULFILLED: (state, action) => ({
      ...state,
      entities: {
        ...state.entities,
        sections: {
          _loading: false,
          ...action.payload.sections.reduce((a, s) => ({...a, [s.id]: s}), {}),
        },
      },
    }),
    REJECTED: (state) => ({
      ...state,
      entities: {
        ...state.entities,
        sections: {
          ...state.entities.sections,
          _loading: false,
        },
      },
    }),
  },
}, initialState);

export const getSections = (state) => Object.keys(state.entities.sections)
  .reduce((ret, id) => {
    switch (id) {
      case '_loading':
        return ret;

      default:
        return ret.concat(state.entities.sections[id]);
    }
  }, []);

export const getSection = (state, sectionId) => state.entities.sections[sectionId];

export default reducer;
