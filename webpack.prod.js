const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ],
  devServer: {
    port: 3000,
    static: './dist',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept'
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
