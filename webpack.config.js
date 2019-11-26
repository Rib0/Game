const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  entry: ['./src/javascript'],
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: !isProd ? '[name].js' : '[name].[hash].js',
  },
  devtool: isProd && 'cheap-module-source-map',
  devServer: {
    compress: true,
    overlay: true,
    historyApiFallback: true,
    port: 8080,
    hot: true,
    open: 'chrome',
    contentBase: path.resolve(__dirname, 'build/'),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          }
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
          loader: 'file-loader',
          exclude: /\.(js|css|scss|html|svg)/,
          options: { 
              name: 'images/[name].[ext]' 
          },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    alias: {
      images: path.resolve(__dirname, 'src/images/')
    }
  },
  stats: {
    hash: false,
    version: false,
    children: false,
    modules: false,
    warnings: false,
    entrypoints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new MiniCssExtractPlugin({
      filename: !isProd ? '[name].css' : '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './index.html',
      filename: 'index.html',
    }),
    !isProd && new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    isProd && new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    // new CopyPlugin([
    //   { 
    //     from: 'src/images', 
    //     to: 'images',
    //     force: true 
    //   },
    // ]),
  ].filter(Boolean),
};

module.exports = config;