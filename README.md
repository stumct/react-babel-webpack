https://leanpub.com/reactspeedcoding/read#leanpub-auto-introduction

init the project and create the package.json
    npm init

Install React dependencies
    npm install --save react
    npm install --save react-dom

Install Webpack dependencies
    npm install --save-dev webpack
    npm install --save-dev webpack-dev-server

Install Webpack plugins
    npm install --save-dev html-webpack-plugin
    npm install --save-dev html-webpack-template

Install Webpack loaders (Webpack requires loaders to process specific file types.)
    npm install --save-dev css-loader
    npm install --save-dev style-loader
    
Install Babel dependencies (Babel transpiles React JSX and ES6 to ES5 JavaScript.)
    npm install --save-dev babel-core
    npm install --save-dev babel-loader
    npm install --save-dev babel-preset-es2015
    npm install --save-dev babel-preset-react
    npm install --save-dev babel-preset-react-hmre
    npm install --save-dev babel-plugin-transform-class-properties
    
For production following plugins add functionality to Webpack.

    npm install --save-dev clean-webpack-plugin
    npm install --save-dev extract-text-webpack-plugin   
    npm install --save-dev html-minifier
    
Your production app will have several public assets including images, icons, among others. 
During build we want to copy this folder over to build folder. 
We add CopyWebpackPlugin to our environment.    
    npm install --save-dev copy-webpack-plugin


Create /.babelrc (Babel configuration is specified in .babelrc file.)

Create /webpack.config.js
    
Configuring startup scripts
We can configure startup scripts in package.json to speed up our development even further.

  "scripts": {
    "start": "SET NODE_ENV=development & webpack-dev-server",
    "build": "SET NODE_ENV=production & webpack --config webpack.prod.config.js"
  },"# react-babel-webpack" 
