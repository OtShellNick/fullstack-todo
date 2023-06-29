const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const FontPreloadPlugin = require('webpack-font-preload-plugin');

const { NODE_ENV } = process.env;
const IsDev = NODE_ENV === 'development';

const filename = (ext) =>
    IsDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const cssLoaders = (extra) => {
    const loaders = [MiniCssExtractPlugin.loader, 'css-loader'];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};

const babelOptions = (preset) => {
    const opts = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
    };

    if (preset) {
        opts.presets.push(preset);
    }

    return opts;
};

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions(),
        },
    ];

    return loaders;
};

const plugins = () => [
    new HTMLWebpackPlugin({
        template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new FontPreloadPlugin({
        loadType: 'preload',
    }),
    new MiniCssExtractPlugin({
        filename: filename('css'),
    }),
    new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
    })
];

module.exports = {
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.scss'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@style': path.resolve(__dirname, './src/style'),
            '@containers': path.resolve(__dirname, './src/containers'),
            '@helpers': path.resolve(__dirname, './src/helpers'),
            '@actions': path.resolve(__dirname, './src/actions'),
            '@config': path.resolve(__dirname, './src/config'),
            '@store': path.resolve(__dirname, './src/store'),
            '@types': path.resolve(__dirname, './src/types'),
        },
    },
    mode: NODE_ENV || 'production',
    entry: ['@babel/polyfill', path.resolve(__dirname, './src/index.jsx')],
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '',
        pathinfo: true,
        filename: '[name].[fullhash].js',
        chunkFilename: '[name].[id].[fullhash].js',
    },
    optimization: {
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [new TerserPlugin({
            minify: TerserPlugin.uglifyJsMinify,
        })],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                oneOf: [
                    {
                        resourceQuery: /[j]sx/,
                        use: ['@svgr/webpack'],
                    },
                ],
                issuer: /\.[j]sx?$/,
            },
            {
                test: /\.(jpe?g|png|gif|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[contenthash][ext]',
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-react'),
                    },
                ],
            },
        ],
    },
    devServer: {
        port: 8088,
        static: './build',
        historyApiFallback: true,
        compress: true,
    },
    plugins: plugins(),
};
