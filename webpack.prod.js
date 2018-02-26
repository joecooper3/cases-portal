const ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpack = require('webpack');
var path = require('path');

var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');
var SCSS_DIR = path.resolve(__dirname, 'sass');

var config = {
  entry: {
    'index': SRC_DIR + '/index.jsx',
    'department': SRC_DIR + '/department.jsx',
    'staff': SRC_DIR + '/staff.jsx',
    'program': SRC_DIR + '/program.jsx',
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js'
  },
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
        use: [{loader: "style-loader"},
        {loader: "css-loader"},
        {loader: "postcss-loader"},
        {loader: "sass-loader"}]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ]
};

module.exports = config;
