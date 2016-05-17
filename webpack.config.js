//To start off, you need to initialize the config file with dependencies. 
//There are only two in case of development config, webpack and HTML generation plugin.
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//Next we initialize the APP, BUILD, and STYLE paths.
const APP = path.resolve(__dirname + '/app');
const BUILD = path.resolve(__dirname + '/build');
const STYLE = path.resolve(__dirname + '/app/styles.css');
const PUBLIC = path.resolve(__dirname + '/app/public');
const TEMPLATE = path.resolve(__dirname + '/app/templates/index_default.html');

//Next section defines your app entry, output, and extensions.
module.exports = {
  entry: {
    app: APP + '/index.jsx',
    style: STYLE
  },
  output: {
    path: BUILD,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  //We follow this by defining the loaders for processing various file types used within our app.
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
      include: APP
    }, {
      test: /\.css$/,
      loader: "style!css",
      exclude: '/node_modules/',
      include: APP
    }]
  },

  //Now that we have loaders configured, let us add settings for our development server. 
  //Source maps are used for debugging information. 
  //The devServer settings are picked up by webpack-dev-server as it runs.

  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    stats: 'errors-only',

    host: process.env.HOST,
    port: process.env.PORT
  },

  //We now wrap up by adding plugins needed during our development.
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: PUBLIC,
      to: BUILD
    }], {
      ignore: [
        '.DS_Store'
      ]
    })
  ]
};