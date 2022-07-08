const path = require('path');
module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
            },
            { test: /\.m?js$/,
                use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react' ]
                }
                }
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader',
                options: {
                limit: 25000,
                },
            }
        ]
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            utils: path.resolve(__dirname, 'src/utils'),
            providers: path.resolve(__dirname, 'src/providers'),
            hooks: path.resolve(__dirname, 'src/hooks'),
            config: path.resolve(__dirname, 'src/config'),
        }
    },
    watch: true,
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    }
};