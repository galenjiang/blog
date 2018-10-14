/* eslint-disable */
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const path = require('path')
const chalk = require('chalk')
const devConfig = require('./webpack.dev.conf')

const app = express()
const compiler = webpack(devConfig)
app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    contentBase: path.join(__dirname, '../server'),
    stats: {
      colors: true,
    },
    historyApiFallback: true,
    hot: true,
}))
app.use(webpackHotMiddleware(compiler, {
  log: () => {}
}))
app.listen(3000, () => {
  console.log(chalk.yellow('[webpack-dev-server]', 'http://localhost:3000/'));
})
