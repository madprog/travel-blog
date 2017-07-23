const app = require('./app').default;
const constants = require('./constants');
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

if (constants.ENABLE_EDITION) {
  db.createSection = ({ name }) => {
    const section = {
      id: db.nameToId(name),
      name,
      articles: [],
    };

    db.sections.insert(section);

    return section;
  };

  app.post('/api/sections', (req, res) => {
    const section = db.createSection(req.body);
    res
      .status(201)
      .set({
        'Location': '/api/sections/' + section.id,
      })
      .json(section);
  });
}
