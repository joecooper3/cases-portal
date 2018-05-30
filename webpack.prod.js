const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist2');
const SRC_DIR = path.resolve(__dirname, 'src');
const SCSS_DIR = path.resolve(__dirname, 'sass');

const config = {
  entry: {
    index: `${SRC_DIR}/index.jsx`,
    department: `${SRC_DIR}/department.jsx`,
    staff: `${SRC_DIR}/staff.jsx`,
    program: `${SRC_DIR}/program.jsx`,
    'search-only': `${SRC_DIR}/search-only.jsx`,
    directory: `${SRC_DIR}/directory.jsx`,
    compliance: `${SRC_DIR}/compliance.jsx`,
    resources: `${SRC_DIR}/resources.jsx`,
    'department-directory': `${SRC_DIR}/department-directory.jsx`,
    'comms-archive': `${SRC_DIR}/comms-archive.jsx`,
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
