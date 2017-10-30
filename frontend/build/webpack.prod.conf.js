const baseConfig = require('./webpack.base.conf.js')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {

  plugins: [

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ]
})
