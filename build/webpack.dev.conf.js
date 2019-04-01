/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const baseConfig = require('./webpack.config')
/* eslint-enable */
module.exports = merge.smart(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  stats: 'verbose',
  output: {
    path: path.resolve(__dirname, '../dev'),
  },
  module: {
    rules: [],
  },

  devServer: {
    contentBase: [
      path.resolve(__dirname, '../dev'),
      path.resolve(__dirname, '../dll'),
    ],
    host: '0.0.0.0',
    port: 8080,
    proxy: {},
  },

  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
    // new webpack.DllReferencePlugin({
    //   // context: path.resolve('..'),
    //   manifest: require('../dll/manifest.json'),
    //   // name: 'vendor'
    // })
  ],
})
