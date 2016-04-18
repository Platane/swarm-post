const path = require('path')
const webpack = require('webpack')


module.exports = {

    entry: {
        'app' : [ './src/web_modules/index.jsx' ],
        'boot' : [ './src/boot.js' ],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },

    module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|\.tmp)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-1'],
                }
            },

            {
                test: /\.jsx$/,
                exclude: /(node_modules|\.tmp)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-1', 'react'],
                }
            },

            {
                test: /\.png$/,
                exclude: /(node_modules|\.tmp)/,
                loader: 'file!image-webpack?optimizationLevel=7&interlaced=false',
            },

            {
                test: /\.html?$/,
                exclude: /node_modules/,
                loaders: [],
            },

            {
                test: /\.css$/,
                loader: 'css'
            },

        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"' + process.env.NODE_ENV + '"'
            },
        }),

        ...(
            process.env.NODE_ENV == 'production'
                ? [ new webpack.optimize.UglifyJsPlugin({ compress: {warnings: false} }) ]
                : []
        )
    ],
}
