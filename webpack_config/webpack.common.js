const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
    modules: [paths.src, paths.modules, paths.root],
    alias: {
      snapsvg: 'snapsvg/dist/snap.svg.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      imgOG01: path.join(paths.assets, 'assets/imgs/og-01.png'),
      imgOG02: path.join(paths.assets, 'assets/imgs/og-02.png'),
      imgOG03: path.join(paths.assets, 'assets/imgs/og-03.png'),
      imgOG04: path.join(paths.assets, 'assets/imgs/og-04.png'),

      appleTouchIcon: path.join(paths.assets, 'assets/imgs/favicon/apple-touch-icon.png'),
      safariPinnedTab: path.join(paths.assets, 'assets/imgs/favicon/safari-pinned-tab.svg'),
      favicon3232: path.join(paths.assets, 'assets/imgs/favicon/favicon-32x32.png'),
      favicon1616: path.join(paths.assets, 'assets/imgs/favicon/favicon-16x16.png')
    }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      disable: process.env.NODE_ENV === 'development'
    })
  ]
};

module.exports = config;
