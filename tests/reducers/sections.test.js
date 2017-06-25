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
          entities: {
            sections: {
              _loading: true,
            },
          },
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
          entities: {
            sections: {
              _loading: false,
              42: { id: 42, blah: 1234 },
              1337: { id: 1337, foo: 'bar' },
              graal: { id: 'graal', blectre: 'python' },
            },
          },
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
          entities: {
            sections: {
              _loading: false,
            },
          },
        });
    });
  });
});
