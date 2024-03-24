const express = require('express');

// 后续require 的文件会交由 babel 转译
require("babel-register")({
  ignore: [/(node_modules)/],
  presets: ["babel-preset-env", "babel-preset-react"],
});

const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack');

  const compiler = webpack(webpackConfig({}));

  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static('public'));
}

const {default: serverRenderer} = require('../public/server')
console.log(serverRenderer, 'serverrender')
app.use(serverRenderer);

module.exports = app;
