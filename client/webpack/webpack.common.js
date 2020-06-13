const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const getEntries = require('./getEntries');

module.exports = {
  entry: getEntries(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  plugins: [new ManifestPlugin(), new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname) })],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },

      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
