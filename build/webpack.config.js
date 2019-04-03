const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')

// TODO: Is it needed?
// const DeclarationBundlerPlugin = require('webpack-plugin-typescript-declaration-bundler');

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  // mode: 'production',
  // devtool: "source-map",
  // Change to your "entry-point".
  // context: path.resolve(__dirname, '../src'),
  entry: {
    main: './src/index',
  },
  output: {
    path: path.resolve('dist'),
    filename: 'static/js/[name]_[hash:4].js',
    chunkFilename: 'static/js/chunk_[name]_[chunkhash:4].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  externals: {
    // ramda: 'ramda'
    // ramda: {
    //     commonjs: 'ramda',
    //     commonjs2: 'ramda',
    //     amd: 'ramda',
    //     root: 'ramda'
    // }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        oneOf: [
          {
            test: /.mdx?$/,
            use: ['babel-loader', '@mdx-js/loader'],
          },
          {
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.module\.css/,
            use: (isDev
              ? [
                  {
                    loader: 'style-loader',
                  },
                ]
              : [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                  },
                ]
            ).concat([
              {
                loader: 'css-loader',
                options: {
                  localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                  importLoaders: 1,
                  modules: true,
                  url: (url, resourcePath) => {
                    return url.includes('http://www.xxx.com')
                  },
                },
              },
              {
                loader: 'postcss-loader',
              },
            ]),
          },
          {
            test: /\.css/,
            use: (isDev
              ? [
                  {
                    loader: 'style-loader',
                  },
                ]
              : [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                  },
                ]
            ).concat([
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  url: (url, resourcePath) => {
                    return url.includes('http://www.xxx.com')
                  },
                },
              },
              {
                loader: 'postcss-loader',
              },
            ]),
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            exclude: /node_modules/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  optimization: {
    // minimizer: [
    //     // TODO:
    //     /**
    //      * While webpack 5 is likely to come with a CSS minimizer built-in,
    //      * with webpack 4 you need to bring your own. To minify the output,
    //      * use a plugin like optimize-css-assets-webpack-plugin. Setting optimization.
    //      * minimizer overrides the defaults provided by webpack,
    //      * so make sure to also specify a JS minimizer:
    //      **/
    //     new UglifyJsPlugin({
    //         cache: true,
    //         parallel: true,
    //         sourceMap: true // set to true if you want JS source maps
    //     }),
    //     // new OptimizeCSSAssetsPlugin({})
    // ],
    // namedModules: true,
    // namedChunks: true,
    // moduleIds: 'named',
    // chunkIds: 'named'
    splitChunks: {
      chunks: 'all', // default async
      minSize: 0, // default 30000
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true, // 忽略默认配置
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    // runtimeChunk: true
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_SERVER': JSON.stringify(process.env.APP_SERVER),
    }),
    // new MiniCssExtractPlugin({
    //     filename: "[name].css"
    // }),

    new HtmlWebpackPlugin({
      template: 'public/index.ejs',
      templateParameters: {
        NODE_ENV: process.env.NODE_ENV,
      },
      filename: 'index.html',
      excludeChunks: ['other'],
    }),

    new HtmlWebpackPlugin({
      template: 'public/index.ejs',
      templateParameters: {
        NODE_ENV: process.env.NODE_ENV,
      },
      filename: 'other.html',
      excludeChunks: ['main'],
    }),

    new webpack.DllReferencePlugin({
      // context: path.resolve('..'),
      // eslint-disable-next-line
      manifest: require('../dll/manifest.json'),
    }),
  ],
}
