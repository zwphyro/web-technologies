export default {
    mode: "development",
    entry: {
        index: "./public/javascripts/index.js"
    },
    output: {
        filename: './[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            }
        ]
    },
}
