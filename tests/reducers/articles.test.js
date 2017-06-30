import * as articles from 'reducers/articles';
import * as sections from 'reducers/sections';

describe('Helpers', () => {
  const state = {
    entities: {
      articles: {
        id1: { id: 'id1' },
        id2: { id: 'id2' },
        id3: { id: 'id3', data: 'random' },
      },
    },
  };

  describe('getArticle', () => {
    it('should return the article having this id', () => {
      expect(articles.getArticle(state, 'id1')).toEqual({ id: 'id1' });
      expect(articles.getArticle(state, 'id2')).toEqual({ id: 'id2' });
      expect(articles.getArticle(state, 'id3')).toEqual({ id: 'id3', data: 'random' });
    });

    it('should return undefined if no article having this id is found', () => {
      expect(articles.getArticle(state, 'unexistant')).toBeUndefined();
    });
  });

  describe('getArticlesOfSection', () => {
    it('should return the sections according to a section', () => {
      const localState = {
        ...state,
        entities: {
          ...state.entities,
          sections: {
            sid1: { articles: ['id1', 'id2', 'id3'] },
            sid2: { articles: ['id3', 'id1', 'id2'] },
            sid3: { articles: ['id1', 'id2', 'id3', 'id1', 'id2'] },
          },
        },
      };

      expect(articles.getArticlesOfSection(localState, 'sid1'))
        .toEqual([{ id: 'id1' }, { id: 'id2' }, { id: 'id3', data: 'random' }]);

      expect(articles.getArticlesOfSection(localState, 'sid2'))
        .toEqual([{ id: 'id3', data: 'random' }, { id: 'id1' }, { id: 'id2' }]);

      expect(articles.getArticlesOfSection(localState, 'sid3'))
        .toEqual([{ id: 'id1' }, { id: 'id2' }, { id: 'id3', data: 'random' }, { id: 'id1' }, { id: 'id2' }]);
    });

    it('should return the empty list if the section is not found', () => {
      const localState = {
        ...state,
        entities: {
          ...state.entities,
          sections: {},
        },
      };

      expect(articles.getArticlesOfSection(localState, 'sid1'))
        .toEqual([]);
    });
  });
});
