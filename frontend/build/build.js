/* eslint-disable */
const webpack = require('webpack')
const buildConfig = require('./webpack.prod.conf')

const compiler = webpack(buildConfig, (err, stats) => {
  if (err) throw err;
  process.stdout.write(`${stats.toString({
    colors: true,
    modules: true,
    children: true,
    chunks: true,
    chunkModules: true,
  })}\n`);
});
