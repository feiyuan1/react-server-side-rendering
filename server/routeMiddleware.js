/**
 * 待实现
 */
// const path = require('path')
// const fs = require('fs')

module.exports =  (req, res, next) => {
  // 问题：非资源类型的请求无法进入 webpackdevmiddleware 后的中间件
  // const {outputPath} = res.locals.webpackStats.toJson()
  // const mfs = res.locals.webpackStats.compilation.inputFileSystem
  // // console.log('res.locals: ', res.locals, Object.keys(locals), Object.keys(locals.assetsByChunkName), locals.outputPath, locals.assets)
  // // console.log('server-path: ', assetsByChunkName, outputPath)
  // // console.log('compilation: ', mfs.readFileSync)
  // const getFsAndPath = () => {
  //   if (process.env.NODE_ENV === 'development') {
  //     return {
  //       fs: mfs,
  //       path: path.resolve(outputPath)
  //     }
  //   }
  //   return {
  //     fs,
  //     path: path.resolve(__dirname, '../public')
  //   }
  // }

  // const {path: basicPath, fs} = getFsAndPath()
  // const htmlContent =  fs.readFileSync(path.resolve(basicPath, 'index.html')).toString()
  // const manifest =  fs.readFileSync(path.resolve(basicPath, 'manifest.json')).toString()
  // const keep = Object.keys(assets).some(req.originalUrl.includes.bind(req.originalUrl)) || req.originalUrl.match('/api/')
  // const assets = JSON.parse(manifest)
  // console.log('assets: ', assets, req.originalUrl, htmlContent)

  // if(!keep) {
  //   serverRenderer(req, res, htmlContent)
  // }
 
  // console.log('keep result from devmiddle')
  next()
}