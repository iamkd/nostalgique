const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devTool: 'cheap-module-source-map',
  entry: './src/app.js',
  output: {
    path: './dist/js',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass!postcss-loader'),
    }],
  },
  plugins: [
    new ExtractTextPlugin('../css/style.css', {
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  postcss: () => [autoprefixer],
};
