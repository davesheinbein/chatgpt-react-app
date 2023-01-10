const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './pages/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true,
						},
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{ test: /\.txt$/, use: 'raw-loader' },
		],
	},
	resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/")
    },
		extensions: ['*', '.js', '.jsx'],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
		new webpack.DefinePlugin({
			'typeof window': JSON.stringify('object'),
		}),
	],
};
