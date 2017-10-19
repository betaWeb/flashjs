'use strict'

const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


let config = {

  entry: {
    app: ['./src/FlashMessage.js']
  },

  watch: true,

  output: {
    path: path.resolve('./dist'),
    filename: 'flash.min.js'
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
      }
    ]
  },
  
  plugins: [
    new UglifyJSPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./src'),
      verbose: true,
      dry: false
    })
  ]

}

module.exports = config
