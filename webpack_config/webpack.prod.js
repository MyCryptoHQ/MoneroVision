const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

const config = merge(common, {
	output: {
		publicPath: './',
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
							options: { minimize: true },
						},
						// { loader: 'postcss-loader', options: { sourceMap: true } },
						{
							loader: 'resolve-url-loader',
						},
						{
							loader: 'sass-loader',
							options: { sourceMap: true },
						},
					],
				}),
			},
		],
	},
	plugins: [
		new UglifyJSPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': 'production',
		}),
	],
})

module.exports = config
