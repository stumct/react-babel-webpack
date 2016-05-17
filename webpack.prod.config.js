const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP = path.resolve(__dirname + '/app');
const BUILD = path.resolve(__dirname + '/build');
const STYLE = path.resolve(__dirname + '/app/styles.css');
const PUBLIC = path.resolve(__dirname + '/app/public');
const TEMPLATE = path.resolve(__dirname + '/app/templates/index_default.html');

const PACKAGE = Object.keys(
  require('./package.json').dependencies
);

//Our next section is similar to development config. 
//For production use case it adds chunkhash to file names. 
//This optimizes browser cache and CDN storage/retrieval as only updated files are downloaded as you apply patches to your production code.
module.exports = {
  entry: {
    app: APP,
    style: STYLE,
    vendor: PACKAGE
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: BUILD,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },

  //We continue using Babel loader for JSX files. 
  //For CSS we use extract text plugin so we can generate separate CSS file. 
  //This helps in browser caching as well as avoids FOUC or Flash Of Unstyled Content during initial app loading within the browser.

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
      include: APP
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css'),
      exclude: '/node_modules/',
      include: APP
    }]
  },


  //Clean build. We start by cleaning our build directory of any past builds.
  //Optimize HTML. Then we continue with HTML webpack plugin to generate index.html. We add HTML minifying capability.
  //Extract CSS. Next the CSS is extracted as a separate file.
  //Optionally Dedupe. Larger projects may have dependency trees with duplicate files. Dedupe plugin removes such duplications. This option is commented out in the starter project as it has few dependencies and has no affect on the build size.
  ///Separate JS bundles. Vendor and manifest JavaScript files are bundled separately. This also helps in browser/CDN caching as you may only do a release where one of them is updated, the other does not need to be downloaded again to the client.
  //React for production. Facebook recommends React production settings to optimize the React library payload.
  //Minify JS. Finally we minify the JavaScript.

  plugins: [
    new CleanPlugin([BUILD]),
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      title: 'React',
      appMountId: 'app',
      inject: 'body',
      // Use html-minifier
      minify: {
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([{
      from: PUBLIC,
      to: BUILD
    }], {
      ignore: [
        '.DS_Store'
      ]
    }),
  ]
};