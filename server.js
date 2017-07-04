const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const database = require('./server-database.json');
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
  res.json({
    sections: database.sections.map(s => Object.assign({}, s, {
      articles: database.articles.filter(a => a.section == s.id).map(a => Object.assign({}, a, {
        pages: database.pages.filter(p => p.article == a.id),
      })),
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
