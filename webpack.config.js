const fs = require('fs');
const nodeModules = {};
const path = require('path');

fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

function srcPath(subDir) {
    return path.resolve(__dirname, subDir);
}

module.exports = {
    entry: './src/server.ts',
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/dist/platformLocator',
        filename: 'server.js',
    },
    resolve: {
        alias: {
            '@Config': srcPath('src/util'),
        },
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    target: 'node',
    externals: nodeModules
};