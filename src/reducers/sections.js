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
  entities: {
    articles: {},
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
    FULFILLED: (state, action) => {
      const normalized = normalize(action.payload.sections, [schemas.section]).entities;
      return ({
        ...state,
        entities: {
          ...state.entities,
          ...normalized,
          sections: {
            _loading: false,
            ...normalized.sections,
          },
        },
      });
    },
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

export const getArticles = (state, sectionId) => Object.keys(state.entities.articles)
  .reduce((ret, id) => {
    switch (id) {
      case '_loading':
        return ret;

      default:
        const article = state.entities.articles[id];

        if (sectionId !== undefined && article.section !== sectionId) {
          return ret;
        }

        return ret.concat(article);
    }
  }, []);

export default reducer;
