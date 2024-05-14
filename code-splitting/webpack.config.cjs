const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].chunk.js",
    asyncChunks: true,
    path: path.resolve(__dirname, "dist"),
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_module)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: { version: 3, proposals: true }
                },
              ],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        lodash: {
          test: /[\\/]node_modules[\\/]lodash-es[\\/]/,
          name: "lodash",
          chunks: "all", // 确保包括初始和异步 chunks
        },
        corejs: {
          test: /[\\/]node_modules[\\/]core-js[\\/]/,
          name: "corejs",
          chunks: "all", // 确保包括初始和异步 chunks
        }
      },
    },
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html"),
      filename: "index.html",
    }),
    new webpack.ProvidePlugin({
      React: 'react', // 指定React模块名
    })
  ],
};
