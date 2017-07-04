import { schema } from 'normalizr';

export const page = new schema.Entity('pages');
export const article = new schema.Entity('articles', {
  pages: [page],
});
export const section = new schema.Entity('sections', {
  articles: [article],
});
