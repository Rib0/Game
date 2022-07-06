const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.NODE_ENV === 'analyze';

const config = {
    entry: ['./src', './src/root.css', './src/index.css'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: !isProd ? '[name].js' : '[name].[chunkhash].js',
        chunkFilename: !isProd ? '[id].js' : '[name].[chunkhash].js', // for code splitting chunks (dynamic import)
        clean: true
    },
    devtool: !isProd ? 'inline-cheap-module-source-map' : 'source-map',
    devServer: {
        hot: true,
        historyApiFallback: true,
        port: 8080,
        open: {
            app: {
                name: 'chrome',
            },
        },
    },
    cache: !isProd,
    optimization: {
        runtimeChunk: true, // чтобы при изменении одного модуля не менялся весь app,
        // выносит ссылки на модули в отдельный чанк, обычно при изменении других модулей меняется ссылки на них, а не весь app
        // вместо него будут менять лишь runtimechunk весом в 2кб
        // использовать с moduleIds: 'deterministic'
        splitChunks: {
            chunks: 'all', // выносит общие модули из node_modules и из всего приложения
        },
        chunkIds: 'deterministic',
        moduleIds: 'deterministic',
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
                parallel: true,
            }),
        ],
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx|ts|tsx)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                    },
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: '[name]__[local]--[contenthash:base64:5]',
                                    },
                                    importLoaders: 1,
                                },
                            },
                            'postcss-loader',
                        ],
                    },
                    {
                        exclude: /\.(js|css|html|svg|json)/,
                        type: 'asset/resource',
                        generator: {
                            filename: 'media/[hash][ext]',
                        }
                    },
                ]
            },
        ],
    },
    resolve: {
        symlinks: false,
        cacheWithContext: false,
        extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
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
        children: false,
        colors: true,
        hash: false,
        outputPath: false,
        publicPath: false,
        depth: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: !isProd ? '[name].css' : '[name]_[contenthash].css',
            experimentalUseImportModule: false
        }),
        new webpack.DefinePlugin({
            _ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
        new ForkTsCheckerWebpackPlugin({ // for speed up .ts linting and type checking
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                build: true,
                mode: 'write-references',
            },
        }),
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production',
            pngquant: {
                quality: '95-100'
            }
        }),
        isAnalyze &&
        new BundleAnalyzerPlugin({
            analyzerPort: 8000,
        }),
    ].filter(Boolean),
};

module.exports = config;
