module.exports = function fetchMiddleware(req, res, next){
  console.log('requrl: ', req.originalUrl)
  if(req.originalUrl === '/get/init/data'){
    res.send('initaldata')
  }
  next()
}