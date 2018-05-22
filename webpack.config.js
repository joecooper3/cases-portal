const webpack = require('webpack');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
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
    'comms-archive': `${SRC_DIR}/comms-archive.jsx`
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
