const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    // hot: true, // 设置HMR，使页面不刷新的情况下重载
    writeToDisk: true,
    port: 8081,
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // new webpack.NamedModulesPlugin(), // 设置HMR，使页面不刷新的情况下重载
    // new webpack.HotModuleReplacementPlugin(), // 设置HMR，使页面不刷新的情况下重载
  ],
  mode: 'development',
});
