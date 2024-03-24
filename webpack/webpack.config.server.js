const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',

  entry: './src/server/serverRenderer.js',
  output: {
    filename: 'server.js',
    path: path.resolve('./public'),
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        // include: /serverRender/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [["babel-preset-env"], "babel-preset-react"],
          },
        }
      },
    ],
  },

  plugins: [new CleanWebpackPlugin('./public', { root: path.resolve(__dirname, '../') })]
}
