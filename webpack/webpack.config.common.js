const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')
const WebpackHTMLPlugin = require('html-webpack-plugin')

const isDevMod = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,

  output: {
    filename: 'js/[name].js',
    path: path.resolve('./public'),
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        // use: ['style-loader', 'css-loader'],
        // use: ['isomorphic-style-loader', MiniCssExtractPlugin.loader,  {loader: 'css-loader', options: {
        //   modules: true // 开启 css module
        // }}],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.png?$/,
        // type: 'asset/resource'
        use: ['file-loader']
      },
    ],
  },

  plugins: [
    isDevMod ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin(),
    new WebpackHTMLPlugin({
      template: './template/index.html' // 相对于 output 路径
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new WebpackManifestPlugin()
  ],
};
