/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var isDevelopment = process.argv.indexOf('--development') !== -1;

var entryPath = path.join(__dirname, './src/index.js');
var entry = isDevelopment ? [
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
  }),
  new CopyWebpackPlugin([{ from: 'public', to: 'public' }])
];

isDevelopment && plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = {
  cache: isDevelopment,
  entry: entry,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['jsx-loader', 'babel-loader'],
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
    }, {
      test: /\.css$/,
      loader: 'css-loader'
    }],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: plugins,
};
