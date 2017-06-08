const HtmlwebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const outPath = path.resolve('dist')
const entryPath = path.resolve('src/js/index.js')
module.exports = {
  entry: entryPath,
  output: {
    path: outPath,
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)|(bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['latest']
        }
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'uko-v2.0',
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    compress: true,
    watchContentBase: true,
    port: 9000,
    hot: true,
    inline: true
  }
}
