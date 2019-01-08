const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('../static/js'),
        filename: 'index_bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                use: "babel-loader"
            },
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.(png|jpeg|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader?limit=100000'}

        ]
    }
}

/*
, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
 */