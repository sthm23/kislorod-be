const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (options) => {
    return {
        ...options,
        mode: 'production',
        target: 'node',
        devtool: false,
        externals: [],
        output: {
            ...options.output,
            filename: 'main.js',
            clean: true,
            libraryTarget: 'commonjs2',
        },
        optimization: {
            ...(options.optimization || {}),
            minimize: true,
            splitChunks: false,
            runtimeChunk: false,
            moduleIds: 'deterministic',
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
            ],
        },
        plugins: [
            ...(options.plugins || []),
            // These are optional Nest packages and should not break backend-only bundles.
            new webpack.IgnorePlugin({
                resourceRegExp: /^(class-transformer\/storage|@nestjs\/microservices|@nestjs\/websockets\/socket-module)$/,
            }),
        ],
        stats: 'errors-warnings',
    };
};
