import configureMockStore from 'redux-mock-store';
import nock from 'nock'
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk'

import reducer from 'reducers';
import * as sections from 'reducers/sections';

const middlewares = [thunkMiddleware, promiseMiddleware()];
const createMockStore = configureMockStore(middlewares);

const http = jest.mock('utils/http', () => ({
  get: jest.fn(),
}));

describe('Actions', () => {
  afterEach(nock.cleanAll);

  describe('retrieveSections', () => {
    it('dispatches RETRIEVE_SECTIONS_FULLFILLED when retrieval was successful', () => {
      const sections_symbol = Math.round(Math.random() * 0xffff);

      nock(/.*/)
        .get('/api/sections')
        .reply(200, { sections: sections_symbol });

      const expected_actions = [
        { type: `${sections.RETRIEVE_SECTIONS}_PENDING` },
        { type: `${sections.RETRIEVE_SECTIONS}_FULFILLED`, payload: { sections: sections_symbol } },
      ];
      const store = createMockStore();

      return store.dispatch(sections.retrieveSections())
        .then(() => {
          expect(store.getActions()).toEqual(expected_actions);
        });
    });

    it('dispatches RETRIEVE_SECTIONS_REJECTED when retrieval has failed', () => {
      nock(/.*/)
        .get('/api/sections')
        .reply(5432, 'My detailed error message');

      const expected_actions = [
        { type: `${sections.RETRIEVE_SECTIONS}_PENDING` },
        { type: `${sections.RETRIEVE_SECTIONS}_REJECTED`, error: true, payload: expect.objectContaining({
          status: 5432,
          text: 'My detailed error message',
        }) },
      ];
      const store = createMockStore();

      return store.dispatch(sections.retrieveSections())
        .catch(() => {
          expect(store.getActions()).toEqual(expected_actions);
        });
    });
  });
});

describe('Reducers', () => {
  describe('retrieveSections', () => {
    test('pending', () => {
      expect(reducer(undefined, {
        type: `${sections.RETRIEVE_SECTIONS}_PENDING`
      }))
        .toEqual({
          book: [],
          entities: {
            articles: {},
            sections: {},
          },
          loading: true,
        });
    });

    test('fulfilled', () => {
      expect(reducer(undefined, {
        type: `${sections.RETRIEVE_SECTIONS}_FULFILLED`,
        payload: {
          sections: [
            { id: 42, blah: 1234 },
            { id: 1337, foo: 'bar' },
            { id: 'graal', blectre: 'python' },
          ],
        },
      }))
        .toEqual({
          book: [42, 1337, 'graal'],
          entities: {
            articles: {},
            sections: {
              42: { id: 42, blah: 1234 },
              1337: { id: 1337, foo: 'bar' },
              graal: { id: 'graal', blectre: 'python' },
            },
          },
          loading: false,
        });
    });

    test('rejected', () => {
      expect(reducer(undefined, {
        type: `${sections.RETRIEVE_SECTIONS}_REJECTED`,
        error: true,
        payload: expect.objectContaining({
          status: 5432,
          text: 'My detailed error message',
        }),
      }))
        .toEqual({
          book: [],
          entities: {
            articles: {},
            sections: {},
          },
          loading: false,
        });
    });
  });
});

describe('Helpers', () => {
  const state = {
    entities: {
      sections: {
        id1: { id: 'id1' },
        id2: { id: 'id2' },
        id3: { id: 'id3', data: 'random' },
      },
    },
  };

  describe('getSection', () => {
    it('should return the section having this id', () => {
      expect(sections.getSection(state, 'id1')).toEqual({ id: 'id1' });
      expect(sections.getSection(state, 'id2')).toEqual({ id: 'id2' });
      expect(sections.getSection(state, 'id3')).toEqual({ id: 'id3', data: 'random' });
    });

    it('should return undefined if no section having this id is found', () => {
      expect(sections.getSection(state, 'id4')).toBeUndefined();
    });
  });

  describe('getSections', () => {
    it('should return the sections according to book', () => {
      expect(sections.getSections({ ...state, book: ['id1', 'id2', 'id3'] }))
        .toEqual([{ id: 'id1' }, { id: 'id2' }, { id: 'id3', data: 'random' }]);

      expect(sections.getSections({ ...state, book: ['id3', 'id1', 'id2'] }))
        .toEqual([{ id: 'id3', data: 'random' }, { id: 'id1' }, { id: 'id2' }]);

      expect(sections.getSections({ ...state, book: ['id1', 'id2', 'id3', 'id1', 'id2'] }))
        .toEqual([{ id: 'id1' }, { id: 'id2' }, { id: 'id3', data: 'random' }, { id: 'id1' }, { id: 'id2' }]);
    });
  });
});
