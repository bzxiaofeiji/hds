const path = require('path');

const config = {
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'hds-v1.0.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}

module.exports = config;