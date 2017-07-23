const app = require('./app').default;
const db = require('./db').default;

app.get('/api/sections', (req, res) => {
  res.json({
    sections: db.sections.find().map(s => Object.assign({}, s, {
      articles: db.articles.find({ section: { '$eq': s.id } }).map(a => Object.assign({}, a, {
        pages: db.pages.find({ article: { '$eq': a.id } }),
      })),
    })),
  });
});
