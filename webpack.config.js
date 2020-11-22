const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.NODE_ENV === 'analyze';
// todo добавить неподдерживаемый браузер
// todo дописать все propTypes
// todo перенести все общие компоненты в общую папку
const config = {
    entry: ['./src', './src/index.css'], // todo add polifyll
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: !isProd ? '[name].js' : '[name].[hash].js',
    },
    devtool: 'cheap-module-source-map', // todo source map for production
    devServer: {
        compress: true,
        overlay: true,
        hot: true,
        historyApiFallback: true,
        port: 8080,
        open: 'chrome',
        contentBase: path.resolve(__dirname, 'build/'),
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
                cache: true,
                parallel: true
            }),
        ],
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'cache-loader',
                                options: {
                                    cacheDirectory: path.resolve(
                                        __dirname,
                                        'node_modules/.cache/cache-loader'
                                    ),
                                },
                            },
                            'babel-loader'
                        ]
                    },
                    {
                        test: /\.tsx?$/,
                        exclude: /node-modules/,
                        use: [
                            {
                                loader: 'cache-loader',
                                options: {
                                    cacheDirectory: path.resolve(
                                        __dirname,
                                        'node_modules/.cache/cache-loader'
                                    ),
                                },
                            },
                            'ts-loader'
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    hmr: !isProd,
                                },
                            },
                            {
                                loader: 'cache-loader',
                                options: {
                                    cacheDirectory: path.resolve(
                                        __dirname,
                                        'node_modules/.cache/cache-loader'
                                    ),
                                },
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: '[name]__[local]--[hash:base64:5]',
                                    },
                                    importLoaders: 3,
                                },
                            },
                            'postcss-loader',
                        ],
                    },
                    {
                        exclude: /\.(js|css|html|svg|json)/,
                        use: [
                            {
                                loader: 'cache-loader',
                                options: {
                                    cacheDirectory: path.resolve(
                                        __dirname,
                                        'node_modules/.cache/cache-loader'
                                    ),
                                },
                            },
                            {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name]_[hash].[ext]',
                                },
                            }
                        ],
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.tsx'],
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src/javascript'),
            path.resolve(__dirname, 'src'),
        ],
        alias: {
            Images: path.resolve(__dirname, 'src/images/'),
        },
    },
    stats: {
        builtAt: false,
        children: false,
        colors: true,
        hash: false,
        publicPath: false,
    },
    node: {
        fs: 'empty',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: !isProd ? '[name].css' : '[name].[contenthash].css',
        }),
        new webpack.DefinePlugin({
            _ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './index.html',
            filename: 'index.html',
        }),
        isProd &&
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        isAnalyze &&
        new BundleAnalyzerPlugin({
            analyzerPort: 8000,
        }),
    ].filter(Boolean),
};

module.exports = config;
