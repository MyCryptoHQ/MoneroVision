const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

const config = merge(common, {
	entry: ['react-hot-loader/patch', common.entry],
	devtool: 'source-map',
	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$|\.css$/,
				use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
			},
		],
	},

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],
})

module.exports = config
