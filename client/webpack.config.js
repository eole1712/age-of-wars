/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isDevelopment = process.argv.indexOf('--development') !== -1;

var entryPath = path.join(__dirname, './src/index.js');
var entry = isDevelopment ? [
  'webpack-hot-middleware/client?reload=true',
  'react-hot-loader/patch',
  entryPath
] : entryPath;

var plugins = [

  new webpack.DefinePlugin({

    'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
    __DEV__: isDevelopment
  }),
  new HtmlWebpackPlugin({

    template: 'public/index.html',
    minify: {

      removeComments: !isDevelopment,
      collapseWhitespace: !isDevelopment
    },
    inject: true
  })
];

isDevelopment && plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = {

  cache: isDevelopment,
  entry: entry,
  module: {

    loaders: [{
      test: /\.jsx?$/,
      loaders: ['jsx-loader', 'babel-loader', 'react-hot-loader/webpack'],
      exclude: /node_modules/
    }, {
      test: /\.svg$/,
      loaders: [
        'babel-loader',
        {
          loader: 'react-svg-loader',
          query: {
            jsx: true
          }
        },
      ],
    },
    {
      test: /\.css$/,
      loader: 'css-loader'
    }
  ]
  },
  output: {

    path: path.join(__dirname, 'build'),
    publicPath: '',
    filename: 'bundle.js'
  },
  plugins: plugins
};
