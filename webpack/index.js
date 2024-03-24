const clientConfig = require('./webpack.config.client');
const serverConfig = require('./webpack.config.server')
module.exports = (env) => {
  console.log('env: ', env)
  const isServer = env.target === 'server'
  return !isServer ? clientConfig : serverConfig
};
