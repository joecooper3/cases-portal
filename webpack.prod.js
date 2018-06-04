const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist2');
const SRC_DIR = path.resolve(__dirname, 'src');
const SCSS_DIR = path.resolve(__dirname, 'sass');

const config = {
  entry: {
    master: `${SRC_DIR}/master.jsx`
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('style.css'),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      __API__: "'http://portal.cases.org'"
    })
  ]
};

module.exports = config;
