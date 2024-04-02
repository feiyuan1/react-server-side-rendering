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
        use: {
          loader: 'babel-loader',
          options: {
            presets: [["babel-preset-env", {targets: {'node': 'current'}}]],
          },
        }
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: ['isomorphic-style-loader', {
          loader: 'css-loader',
          options: {
            modules: false
          }
        }],
      },
      {
        test: /\.png?$/,
        // type: 'asset/resource'
        use: [ {
          loader: 'file-loader',
          options: {
            emitFile: false,
          },
        },]
      },
    ],
  },

  plugins: [new CleanWebpackPlugin('./public/server.js', { root: path.resolve(__dirname, '..') })]
}
