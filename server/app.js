const express = require('express');
const fetchMiddleware = require('./fetchMiddleware')
const app = express();
// const path = require('path')
// const fs = require('fs')

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

// preServerRender
// app.use((req, res, next) => {
  // 问题：非资源类型的请求无法进入 webpackdevmiddleware 后的中间件
  // const {outputPath} = res.locals.webpackStats.toJson()
  // const mfs = res.locals.webpackStats.compilation.inputFileSystem
  // console.log('res.locals: ', res.locals, Object.keys(locals), Object.keys(locals.assetsByChunkName), locals.outputPath, locals.assets)
  // console.log('server-path: ', assetsByChunkName, outputPath)
  // console.log('compilation: ', mfs.readFileSync)
  // const htmlContent =  mfs.readFileSync(path.resolve(outputPath, 'index.html'))
  // const manifest =  mfs.readFileSync(path.resolve(outputPath, 'manifest.json')).toString()

  // 这个路径找的不对，要怎么查看当前内存中的路径呢？
  // console.log('dir： ', htmlContent.toString(), manifest)
  // const keep = Object.values(locals.assets).some(asset => asset.name === req.originalUrl)
  // let htmlContent

  // if(!keep) {
    // serverRenderer(req, res, htmlContent)
  // }
  // 这里可能要区分环境 开发用 memoryFs 生产环境用 fs
  // fs、htmlPath、manifestPath


  // const manifest =  fs.readFileSync(path.resolve(__dirname, '../public/manifest.json'), 'utf-8')
  // console.log('manifest: ', manifest)
  // const assets = JSON.parse(manifest)
  // console.log('assets: ', assets, req.originalUrl)
  // console.log('match: ', '/api/get'.match('/api/'))
  // if(Object.keys(assets).some(req.originalUrl.includes.bind(req.originalUrl)) || req.originalUrl.match('/api/')){
  //   console.log('come to devmiddle')
    // next()
  //   return
  // }
  // serverRenderer(req, res)
//   next()
// })


app.use(fetchMiddleware)

// app.use((err, req, res) => {
//   console.log('middle-error: ', err)
// })

module.exports = app;
