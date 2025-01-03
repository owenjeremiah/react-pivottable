// const path = require("path");
// const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  // entry: ["babel-polyfill", "./examples/index.jsx"],
  entry: ["./examples/index.jsx"],
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    moduleIds: "named",
  },
  plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
  // plugins: [
  //   new webpack.NamedModulesPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
  // ],
  devServer: {
    // static: {
    //   directory: path.join(__dirname, "examples"),
    // },
    hot: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
