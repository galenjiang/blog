const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const cssnext = require('postcss-cssnext')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(__dirname, '../src'),

  entry: {
    vendor: ['react', 'react-dom'],
    app: isDevelopment
      ? [
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        './pages/app.tsx'
      ]
      : ['./pages/app.tsx'],
    // test: isDevelopment
    //   ? [
    //     'webpack-hot-middleware/client',
    //     'react-hot-loader/patch',
    //     './pages/test.tsx'
    //   ]
    //   : ['./pages/test.tsx'],
  },

  output: {
    path: path.resolve(__dirname, isDevelopment ? '../server' : '../dist'),
    publicPath: '/',                                         // default ''
    filename: isDevelopment ? 'js/[name].js' : 'js/[name]-[hash:4].js',
    // chunkFilename: isDevelopment ? '[id].chunk.js' : '[name].js'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: 'awesome-typescript-loader',
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: isDevelopment
          ? [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    cssnext
                  ]
                }
              }
            }
          ]
          : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: function () {
                    return [
                      cssnext
                    ]
                  }
                }
              }
            ]
          })
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                precss,
                autoprefixer,
              ]
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS,  fix import mixins can not be recognized
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name]-[hash:4].[ext]?'
            }
          }
        ]
      },
    ]
  },

  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),   // built in config
      }
    }),
    new ExtractTextPlugin({filename: 'style/[name]-[hash:4].css'}),
    new webpack.ProgressPlugin((percentage, msg) => {
      let stream = process.stderr
      if (stream.isTTY && percentage < 0.95) {
        stream.cursorTo(0)
        stream.write('  ' + msg)
        stream.clearLine(1)
      } else if (percentage === 1) {
        console.log('')
        console.log('webpack: bundle build is now finished.')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'vendor'],   // 必须先抽取到common，vendor不能被覆盖, 也不能分开配置，必须写在一起。。。
      minChunks: 2,
      // filename: isDevelopment ? 'js/vendor.js' : 'js/vendor-[hash:4].js'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['runtime'],
      minChunks: Infinity,
    }),
  ],

  devtool: isDevelopment ? 'source-map' : 'cheap-module-source-map'
}
