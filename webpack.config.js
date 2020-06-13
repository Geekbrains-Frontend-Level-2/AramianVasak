const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "main.js",
  },
  resolve: {
    alias: {
      vue: "/Users/shark/Desktop/AramianVasak/node_modules/vue/dist/vue.esm.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "vue-style-loader",
          "style-loader",
          {
            loader: "css-loader",
            options: {
                modules: {
                    localIdentName: "[local]",
                },
            }
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "vue-style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
