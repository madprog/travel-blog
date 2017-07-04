const express = require('express');
const fs = require('fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config.js');

const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.get('/api/sections', (req, res) => {
  const database = JSON.parse(fs.readFileSync('./server-database.json', 'utf8'));

  res.json({
    sections: database.sections.map(s => Object.assign({}, s, {
      articles: database.articles.filter(a => a.section == s.id).map(a => Object.assign({}, a, {
        pages: database.pages.filter(p => p.article == a.id).map(p => Object.assign({}, p, {
          contents: JSON.parse(p.contents),
          template: JSON.parse(p.template),
        })),
      })),
    })),
  });
});

app.get('/api/templates', (req, res) => {
  const database = JSON.parse(fs.readFileSync('./server-database.json', 'utf8'));

  res.json({
    templates: database.templates.map(t => Object.assign({}, t, {
      spec: JSON.parse(t.spec),
    })),
  });
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/www/index.html');
});

const server = app.listen(5000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
