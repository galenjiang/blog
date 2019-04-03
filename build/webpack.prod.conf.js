const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        oneOf: [],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]_[chunkhash:4].css',
    }),

    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '..'),
      verbose: true,
    }),

    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // }),

    // new webpack.DllReferencePlugin({
    //   // context: path.resolve('..'),
    //   manifest: require('../dll/manifest.json'),
    //   // name: 'vendor'
    // })
  ],
})
