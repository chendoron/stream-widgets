const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Is the current build a development build
const IS_DEV = process.env.NODE_ENV === 'dev'

const dirNode = 'node_modules'
const dirApp = path.join(__dirname, 'app')
const dirAssets = path.join(__dirname, 'assets')

const widgetNames = ['webcam-frame']

/**
 * Webpack Configuration
 */
module.exports = {
    entry: widgetNames.reduce(
        (acc, widgetName) => ({
            ...acc,
            [widgetName]: path.join(dirApp, widgetName),
        }),
        {}
    ),
    resolve: {
        modules: [dirNode, dirApp, dirAssets],
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV,
        }),

        ...widgetNames.map(
            (widgetName) =>
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, 'templates', `${widgetName}.ejs`),
                    filename: `${widgetName}.html`,
                    chunks: [widgetName],
                })
        ),
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true,
                },
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV,
                        },
                    },
                ],
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            hmr: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets],
                        },
                    },
                ],
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    },
}
