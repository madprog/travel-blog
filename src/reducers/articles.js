import * as sections from './sections';

export const getArticlesOfSection = (state, sectionId) => ((sections.getSection(state, sectionId) || {}).articles || [])
  .map(id => state.entities.articles[id]);

export const getArticle = (state, articleId) => state.entities.articles[articleId];
