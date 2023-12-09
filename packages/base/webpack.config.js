const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const { ModuleFederationPlugin } = webpack.container;

const deps = require('./package.json').dependencies;

const isProd = process.env.NODE_ENV === 'production';

const config = {
    entry: ['./src/components/Button', './src/components/Icon', './src/components/Loader', './src/components/Modal'],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: 'auto',
        filename: !isProd ? '[name].js' : '[name].[chunkhash].js',
        // chunkFilename: !isProd ? '[id].js' : '[name].[chunkhash].js', // for code splitting chunks (dynamic import)
        clean: true
    },
    devtool: !isProd ? 'inline-cheap-module-source-map' : 'source-map',
    devServer: {
        hot: true,
        historyApiFallback: true,
        port: 3000,
        open: {
            app: {
                name: 'chrome',
            },
        },
    },
    cache: !isProd,
    // optimization: {
    //     runtimeChunk: true, // чтобы при изменении одного модуля не менялся весь app,
    //     // выносит ссылки на модули в отдельный чанк, обычно при изменении других модулей меняется ссылки на них, а не весь app
    //     // вместо него будут менять лишь runtimechunk весом в 2кб
    //     // использовать с moduleIds: 'deterministic'
    //     splitChunks: {
    //         chunks: 'all', // выносит общие модули из node_modules и из всего приложения, мб выключить из-за module federation
    //     },
    //     chunkIds: 'deterministic', // TODO: сделать publicPath для shared
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
                        test: /\.(js|jsx)$/,
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
                    }
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src'),
        ],
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
        new MiniCssExtractPlugin({
            filename: !isProd ? '[name].css' : '[name]_[contenthash].css',
            experimentalUseImportModule: false
        }),
        new webpack.DefinePlugin({
            _ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        new ModuleFederationPlugin({
            name: 'base',
            filename: 'remoteEntry.js',
            shared: {
              react: { singleton: true },
              'react-dom': { singleton: true },
            },
            exposes: {
              './Button': './src/components/Button',
              './Icon': './src/components/Icon',
              './Loader': './src/components/Loader',
              './Modal': './src/components/Modal',
            },
          }),
    ]
};

module.exports = config;
