const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const paths = {
  root: path.join(__dirname, '../'),
  src: path.join(__dirname, '../src'),
  output: path.join(__dirname, '../dist'),
  assets: path.join(__dirname, '../src/assets'),
  static: path.join(__dirname, '../public'),
  modules: path.join(__dirname, '../node_modules')
};

const config = {
  entry: paths.src + '/root.tsx',
  output: {
    filename: '[name].bundle.js',
    path: paths.output,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              plugins: ['react-hot-loader/babel']
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.sass', '.css'],
    modules: [paths.src, paths.modules, paths.root]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      disable: process.env.NODE_ENV === 'development'
    })
    // TODO: favicons-webpack-plugin not compatible for webpack v4
    // new FaviconsWebpackPlugin({
    //   logo: path.join(__dirname, '../src/assets/imgs/favicon.png'),
    //   background: '#fff',
    //   inject: true
    // })
  ]
};

module.exports = config;
