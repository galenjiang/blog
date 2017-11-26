/* eslint-disable */
const baseConfig = require('./webpack.base.conf.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const chalk = require('chalk')

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './pages/app.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

  ],
  devServer: {
    stats: {
      colors: true,
    },
    contentBase: path.join(__dirname, '../server'),
    historyApiFallback: true,
    hot: true,
    publicPath: '',
  }
})
