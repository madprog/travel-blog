import { schema } from 'normalizr';

export const article = new schema.Entity('articles');
export const section = new schema.Entity('sections', {
  articles: [article],
});
