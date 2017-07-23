const app = require('./app').default;
const constants = require('./constants');
const db = require('./db').default;

const sendBook = (req, res) => {
  res.json({
    sections: db.sections.find().map(s => Object.assign({}, s, {
      articles: db.articles.find({ section: { '$eq': s.id } }).map(a => Object.assign({}, a, {
        pages: db.pages.find({ article: { '$eq': a.id } }),
      })),
    })),
  });
};

app.get('/api/sections', sendBook);

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

  db.deleteSection = (id) => {
    const section = db.sections.findOne({ id: { '$eq': id } });
    section.deleted = true;
    db.loki.save();
  };

  db.destroySection = (id) => {
    const section = db.sections.findOne({ id: { '$eq': id } });
    db.sections.remove(section);
    db.loki.save();
  };

  db.updateSection = (id, props) => {
    const section = db.sections.findOne({ id: { '$eq': id } });
    Object.assign(section, props);
    db.loki.save();
  };

  app.patch('/api/sections/:sectionId', (req, res) => {
    db.updateSection(req.params.sectionId, req.body);
    sendBook(req, res);
  });

  app.post('/api/sections', (req, res) => {
    const section = db.createSection(req.body);
    res
      .status(201)
      .set({
        'Location': '/api/sections/' + section.id,
      });
    sendBook(req, res);
  });

  app.delete('/api/sections/:sectionId', (req, res) => {
    if (req.query.destroy === 'true') {
      db.destroySection(req.params.sectionId);
    } else {
      db.deleteSection(req.params.sectionId);
    }
    sendBook(req, res);
  });
}
