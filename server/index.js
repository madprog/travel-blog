const express = require('express');
const loki = require('lokijs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const webpackConfig = require('../webpack.config.js');

const db = {
  loki: new loki(__dirname + '/database.json', {
    autoload: true,
    autoloadCallback() {
      db.sections = db.getOrAddCollection('sections', { unique: ['id', 'name'], indices: ['id'] });
      db.articles = db.getOrAddCollection('articles', { unique: ['id', 'name'], indices: ['id'] });
      db.pages = db.getOrAddCollection('pages', { unique: ['id'], indices: ['id'] });
      db.templates = db.getOrAddCollection('templates', { unique: ['id'], indices: ['id'] });
    },
    autosave: true,
  }),
  getOrAddCollection(name, options) {
    return db.loki.getCollection(name) || db.loki.addCollection(name, options);
  },
};

const app = express();

app.use(express.static(__dirname + '/../www'));

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.get('/api/sections', (req, res) => {
  res.json({
    sections: db.sections.find().map(s => Object.assign({}, s, {
      articles: db.articles.find({ section: { '$eq': s.id } }).map(a => Object.assign({}, a, {
        pages: db.pages.find({ article: { '$eq': a.id } }),
      })),
    })),
  });
});

app.get('/api/templates', (req, res) => {
  res.json({
    templates: db.templates.find(),
  });
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/../www' });
});

const server = app.listen(5000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
