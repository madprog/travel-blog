import * as articles from './articles';
import * as templates from './templates';

export const getPagesOfArticle = (state, articleId) => ((articles.getArticle(state, articleId) || {}).pages || [])
  .map(id => state.entities.pages[id]);

export const getPage = (state, pageId) => ((state.entities || {}).pages || {})[pageId];
