const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const cwd = process.cwd();
const publicDir = path.resolve(cwd, "dist");
const isProduction = process.env.NODE_ENV === "production";
const port = parseInt(process.env.PORT, 10) || 8089;
const srcDir = path.join(cwd, "src");

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: path.resolve(srcDir, "index.js"),
  devtool: isProduction ? "eval" : "cheap-module-source-map",
  output: {
    path: publicDir,
    filename: "app.[hash:6].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [srcDir],
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: {
          presets: ["@babel/env", "@babel/react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        loader: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProduction,
              sourceMap: !isProduction,
              sassOptions: {
                indentWidth: 2,
                sourceComments: false,
              },
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "url-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.(png|svg)$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".json", ".jsx", ".scss"],
  },
  devServer: {
    port,
    historyApiFallback: true,
    hot: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        isProduction ? "production" : "development"
      ),
    }),
    new MiniCssExtractPlugin({
      filename: "app.[hash:6].css",
      chunkFilename: "[id].[hash:6].css",
      ignoreOrder: false,
      minimize: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, "index.html"),
      filename: "index.html",
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
