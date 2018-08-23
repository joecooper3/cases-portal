const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const SCSS_DIR = path.resolve(__dirname, 'sass');

const config = {
  node: {
    fs: 'empty',
    process: 'mock',
    Buffer: true
  },
  entry: {
    master: `${SRC_DIR}/master.jsx`
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __API__: "'http://localhost:8888/cases-portal'"
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
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};

module.exports = config;
