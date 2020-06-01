const path = require("path");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, {loader: "scss-loader"}],
      },
    ],
  },
};