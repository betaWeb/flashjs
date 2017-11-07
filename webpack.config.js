'use strict'

const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractSass = new ExtractTextPlugin({
    filename: "[name].min.css",
})
const externals = {
  "jquery": "jQuery"
}

let config = {

  entry: {
    'flash': './index.js',
    'flash.jquery': './plugins/flash.jquery.js'
  },

  watch: true,

  output: {
    path: path.resolve('./dist'),
    filename: '[name].min.js'
  },

  devtool: false,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      }
    ]
  },
  
  plugins: [
    extractSass,
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./src'),
      verbose: true,
      dry: false
    })
  ],

  externals

}

module.exports = config
