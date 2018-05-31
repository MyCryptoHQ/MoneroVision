const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const config = merge(common, {
  output: {
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production'
    }),
    new FaviconsWebpackPlugin(path.join(__dirname, '../src/assets/imgs/favicon.png')),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../src/assets/imgs/og-01.png'),
        to: path.join(__dirname, '../dist')
      },
      {
        from: path.join(__dirname, '../src/assets/imgs/og-02.png'),
        to: path.join(__dirname, '../dist')
      },
      {
        from: path.join(__dirname, '../src/assets/imgs/og-03.png'),
        to: path.join(__dirname, '../dist')
      },
      {
        from: path.join(__dirname, '../src/assets/imgs/og-04.png'),
        to: path.join(__dirname, '../dist')
      },
      {
        from: path.join(__dirname, '../src/assets/imgs/favicon/safari-pinned-tab.svg'),
        to: path.join(__dirname, '../dist')
      }
    ])
  ]
});

module.exports = config;
