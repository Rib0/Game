const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.NODE_ENV === 'analyze';
// todo добавить неподдерживаемый браузер
// todo проверить все на eslint в конце разработки
// todo добавить адаптив
// todo add imagemin
// todo обновить зависимости в package.json
// todo перенсти некоторые пакеты в devDependencies в package.json

const config = {
    entry: ['./src', './src/index.css'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: !isProd ? '[name].js' : '[name].[chunkhash].js',
    },
    devtool: !isProd ? 'inline-cheap-module-source-map' : 'source-map',
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
        runtimeChunk: true, // избавляет от проблемы изспользования модулями одних и тех же чанков
        splitChunks: {
            chunks: 'all', // выносит общие модули из всех чанков
        },
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
                parallel: true,
            }),
        ],
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx|tsx|ts)$/,
                        exclude: /node_modules/,
                        use: ['babel-loader'], // for mapping loaders
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
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name]_[hash].[ext]',
                                },
                            },
                        ],
                    },
                ].map(loader => ({
                    ...loader,
                    use: [...loader.use, {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve(
                                __dirname,
                                'node_modules/.cache/cache-loader'
                            ),
                        },
                    },]
                })),
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.tsx', 'ts'],
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src/javascript'),
            path.resolve(__dirname, 'src'),
        ],
        alias: {
            Images: path.resolve(__dirname, 'src/images/'),
            Base: path.resolve(__dirname, 'src/javascript/base/'),
            WordsGame: path.resolve(__dirname, 'src/javascript/games/words/'),
            DigitsGame: path.resolve(__dirname, 'src/javascript/games/digits/'),
            BallsGame: path.resolve(__dirname, 'src/javascript/games/balls/'),
        },
    },
    stats: {
        builtAt: false,
        children: false,
        colors: true,
        hash: false,
        publicPath: false,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: !isProd ? '[name].css' : '[name].[contenthash].css',
        }),
        new webpack.DefinePlugin({
            _ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        isProd && new webpack.HashedModuleIdsPlugin({ // при импорте модулю дается id порядкового импорта, при изменении порядка импорта
            hashDigestLength: 5,                     // id поменяется и все чанки поменяют свой chunkhash, чтобы этого не случилось,
        }),                                         // этот плагин дает id вне зависимости от порядка импорта модуля
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        }),
        // new ESLintPlugin({
        //     extensions: ['js', 'jsx', 'ts', 'tsx'],
        // }),
        // new ForkTsCheckerWebpackPlugin({ // for speed up .ts linting and type checking
        //     typescript: {
        //         diagnosticOptions: {
        //             semantic: true,
        //             syntactic: true,
        //         },
        //         mode: 'write-references',
        //     },
        //     eslint: {
        //         enabled: true,
        //         files: './src/javascript/games/balls/**/*'
        //     },
        // }),
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
