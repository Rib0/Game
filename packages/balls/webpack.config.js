const webpack = require('webpack');
const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = webpack.container;

const deps = require('./package.json').dependencies;

const isProd = process.env.NODE_ENV === 'production';

const config = {
    entry: ['./src'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: !isProd ? '[name].js' : '[name].[chunkhash].js',
        chunkFilename: !isProd ? '[id].js' : '[name].[chunkhash].js',
        clean: true,
        publicPath: 'auto'
    },
    devtool: !isProd ? 'inline-cheap-module-source-map' : 'source-map',
    devServer: {
        hot: true,
        historyApiFallback: true,
        port: 3001,
        open: {
            app: {
                name: 'chrome',
            },
        },
    },
    cache: !isProd,
    // optimization: {
    //     runtimeChunk: true,
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    //     chunkIds: 'deterministic',
    //     moduleIds: 'deterministic',
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin({
    //             terserOptions: {
    //                 compress: {
    //                     drop_console: true,
    //                 },
    //                 format: {
    //                     comments: false,
    //                 },
    //             },
    //             extractComments: false,
    //             parallel: true,
    //         }),
    //     ],
    // },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx|ts|tsx)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
    stats: {
        children: false,
        colors: true,
        hash: false,
        outputPath: false,
        publicPath: false,
        depth: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        }),
        new webpack.DefinePlugin({
            _ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
        new ForkTsCheckerWebpackPlugin({
            // for speed up .ts linting and type checking
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                build: true,
                mode: 'write-references',
            },
        }),
        new ModuleFederationPlugin({
            name: 'balls',
            filename: 'remoteEntry.js',
            shared: {
                react: { singleton: true },
                'react-dom': { singleton: true },
            },
            exposes: {
                './Main': './src/components/MainView'
            },
        }),
    ],
};

module.exports = config;
