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
  /* Database */
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

  /* Web API */
  app.patch('/api/sections/:sectionId', (req, res) => {
    db.updateSection(req.params.sectionId, req.body);
    sendBook(req, res);
  });

  app.post('/api/sections', (req, res) => {
    try {
      const section = db.createSection(req.body);
      res
        .status(201)
        .set({
          'Location': '/api/sections/' + section.id,
        });
      sendBook(req, res);
    } catch (e) {
      if (e.message === 'Duplicate key for property id: Section') {
        res
          .status(409)
          .json({
            validationErrors: {
              name: 'A section with a similar name already exists',
            },
          });
      } else {
        res
          .status(500)
          .json({
            validationErrors: {
              _error: 'Unknown server error: ' + e.message,
            }
          });
      }
    }
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
