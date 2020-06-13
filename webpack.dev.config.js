const merge = require("webpack-merge");
const base = require("./webpack.config");

module.exports = merge(base, {
  output: {
      publicPath: '/js'
  },
  devServer: {
    contentBase: "./public",
    host: "localhost",
    port: 8080,
  },
});