const path = require('path');
const util = require('util')
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const merge = require('webpack-merge');
// import chalk from 'chalk';
const webpackConfig = require('./webpack.config');

const config = merge(webpackConfig, {
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJSPlugin(),
  ],
});

const compiler = webpack(config, (err, stats) => {
  if (err) throw err;
  process.stdout.write(`${stats.toString({
    colors: true,
    modules: true,
    children: true,
    chunks: true,
    chunkModules: true,
  })}\n`);
});

