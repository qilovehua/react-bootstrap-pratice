var webpack = require('webpack');
var path = require('path');
module.exports = {

    // 配置服务器
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: ".", //最好写上，否则报错，难道这里是一个坑？
        port: 8080
    },

    entry: [
      "./js/app.js"
    ],

    output: {
        publicPath: 'build',
        filename: "bundle.js"
    },

    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" },
            {test: /\.less/,loader: 'style-loader!css-loader!less-loader'}
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    }
};
