const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry :{
        Volantes:['babel-polyfill', path.resolve(__dirname,'index.js')],
        vendor: ['jquery','jquery-confirm','jquery-validation','jquery-ui-browserify','jquery-ui']
    }, 
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname,'../../public/js/')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['babel-preset-es2015'],
                        plugins:['transform-async-to-generator']
                    }
                }
            },
            {
                test:/\.html$/,
                use:'html-loader'
            }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            minChunks:Infinity
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "windows.jQuery": "jquery",
            jQuery:'jquery'
        })
    ]
}