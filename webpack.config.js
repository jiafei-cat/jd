const path = require('path')

module.exports = {
  mode: 'development',
  entry: ['/src/viewArticle.ts'],
  output: {
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }]
  }
}