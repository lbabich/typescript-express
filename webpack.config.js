const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

function srcPath(subDir) {
    return path.resolve(__dirname, subDir);
}

module.exports = {
    context: path.resolve('./'),
    entry: [
        'webpack/hot/poll?1000',
        './www',
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'node',
    externals: [nodeExternals({
        // this WILL include `jquery` and `webpack/hot/dev-server` in the bundle, as well as `lodash/*`
        whitelist: ['webpack/hot/dev-server']
    })],
    output: {
        path: __dirname + '/dist/platformLocator',
        filename: 'server.js'
    },
    resolve: {
        alias: {
            '@Config': srcPath('src/util'),
        },
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /node_modules[/\\]jsonstream/i,
                loader: 'shebang-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};