const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, '..'),
  entry: {
    vendor: ['ramda'],
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].dll.js',
    library: 'vendor',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DllPlugin({
      // context: path.resolve('..'),  // same as to webpack context
      name: '[name]',
      path: path.resolve(__dirname, '../dll/manifest.json'),
    }),
  ],
}
