const bodyParser = require('body-parser');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const webpackConfig = require('../webpack.config.js');

const app = express();

app.use(bodyParser.json());

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

module.exports.default = app;
