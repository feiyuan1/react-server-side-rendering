const express = require('express');
const app = express();


const {default: serverRenderer} = require('../public/server')
// console.log(serverRenderer, 'serverrender')

app.get('/',serverRenderer);

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
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

app.use((err, req, res) => {
  console.log('middle-error: ', err)
})

module.exports = app;
