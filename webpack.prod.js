const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

var webpack = require('webpack');
var path = require('path');

var DIST_DIR = path.resolve(__dirname, 'dist2');
var SRC_DIR = path.resolve(__dirname, 'src');
var SCSS_DIR = path.resolve(__dirname, 'sass');

var config = {
  entry: {
    'index': SRC_DIR + '/index.jsx',
    'department': SRC_DIR + '/department.jsx',
    'staff': SRC_DIR + '/staff.jsx',
    'program': SRC_DIR + '/program.jsx',
    'search-only': SRC_DIR + '/search-only.jsx',
    'directory': SRC_DIR + '/directory.jsx',
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js'
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      __API__: "'http://portal.cases.org'"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: SCSS_DIR,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('appz.css')
  ]
};

module.exports = config;
