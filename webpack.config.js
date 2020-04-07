const webpack = require("webpack");
const path = require("path");
const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const extractCSS = new ExtractTextPlugin('css/style.css');

module.exports = {
  devtool: false,
  entry: {
    'lib/main': resolve('.', 'src', 'main.tsx'),
  },
  output: {
    path: path.join(__dirname, "./", "dist"),
    filename: "[name].js"
  },
  mode: isProd ? 'production' : 'development',  
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "lib/vendor",
          chunks: 'all'
        }
      },
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: extractCSS.extract([ 'css-loader' ]),
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"]
  },
  plugins: [    
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: '.settings',
        to: './.settings/'
      },
      {
        from: '.sign',
        to: './.sign/'
      },
      {
        from: '.tproject',
        to: './'
      },
      {
        from: '.project',
        to: './'
      },
      {
        from: 'icon.png',
        to: './'
      },
      {
        from: 'config.xml',
        to: './'
      },
      {
        from: 'images/**/*',
        to: './'
      },
    ]),
    extractCSS,
  ],
  devServer: {
    historyApiFallback: {
      index: '/'
    }
  },
};
