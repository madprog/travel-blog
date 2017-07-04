import * as articles from './articles';

export const getPagesOfArticle = (state, articleId) => ((articles.getArticle(state, articleId) || {}).pages || [])
  .map(id => state.entities.pages[id]);

export const getPage = (state, pageId) => state.entities.pages[pageId];
