const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    port: 3000,
    static: './dist'
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers':
    //     'Origin, X-Requested-With, Content-Type, Accept'
    // }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ]
};
