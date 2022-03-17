const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin }=require('clean-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/pages/index.js'
    },
    output: {
        filename: "main.js",
        publicPath: "",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        port: 8080
    },
     module: {
         rules: [
             {
                 test:/\.(woff|woff2|eot|ttf|otf)$/i,
                 type: "asset/resource",
                 generator: {
                     filename: 'vendor/fonts/[name].[hash][ext]',
                 }
             },
             {
                 test:/\.(png|svg|jpg|jpeg|gif)$/i,
                 type: "asset/resource",
                 generator: {
                     filename: 'images/[name].[hash][ext]',
                 }
             },
             {
                 test: /\.css$/,
                 use: [
                     MiniCssExtractPlugin.loader,
                     {
                         loader: "css-loader",
                         options: {
                             importLoaders: 1
                         }
                     },
                     'postcss-loader'
                 ]
             }
         ]
     },
     plugins: [
         new HtmlWebpackPlugin({
             template: './src/index.html',
             filename: 'index.html',
         }),
         new CleanWebpackPlugin(),
         new MiniCssExtractPlugin(),
     ]
}