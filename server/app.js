const express = require('express');
const fetchMiddleware = require('./fetchMiddleware')
const app = express();
const routeMiddleware = require('./routeMiddleware')

const {default: serverRenderer} = require('../public/server')

// 怎么区分 errormiddlwarea 和 applicationmiddlware
// errorMiddlware 能捕获什么异常？ 

app.get('/', serverRenderer);
app.get('/sub', serverRenderer);

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack');
  const compiler = webpack(webpackConfig({}));

  app.use(webpackDevMiddleware(compiler, { serverSideRender: true }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static('public'));
}

app.use(routeMiddleware)
app.use(fetchMiddleware)

// app.use((err, req, res) => {
//   console.log('middle-error: ', err)
// })

module.exports = app;
