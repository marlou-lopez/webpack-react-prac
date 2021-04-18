const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults', useBuiltIns: "usage", corejs: 3}],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        {
          loader: 'ts-loader'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  devServer: {
    historyApiFallback: true,
    hot: true
  }
}