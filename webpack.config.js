const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    'product-list-entry': [
      './src/product-list.jsx',
    ]
  },
  resolve: {
    fallback: '/usr/local/lib/node_modules',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: `http://${process.env.DEV_HOST}:3000/`,
  },
  devtool: ['source-map'],
  module: {
    loaders: [
      {
        test: /\.jsx|js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'postcss', 'sass?&sourceMap&includePaths[]=./src/asset/style'],
      },
      {
        test: /\.(gif|png|svg|jpg)$/,
        loaders: ['url?limit=8192&name=asset/img/[hash].[ext]'],
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
    ],
  },
  postcss() {
    return [autoprefixer({ browsers: ['Safari > 1'] })];
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'ProductListApplication',
        filename: 'product-list.html',
        chunks: ['common', 'product-list-entry'],
        inject: 'body', template: './src/utils/html-webpack-plugin-template.html',
      }
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'DEV_HOST']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
