const app = require('./app').default;
const db = require('./db').default;

app.get('/api/templates', (req, res) => {
  res.json({
    templates: db.templates.find(),
  });
});

