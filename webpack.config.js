const path = require("path");

const srcPath = path.resolve(__dirname, "./examples/index.js");
const distPath = path.resolve(__dirname, "./examples/dist");

module.exports = {
  entry: {
    main: srcPath,
  },
  output: {
    filename: "bundle.js",
    path: distPath,
  },
  devServer: {
    static: distPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: false } },
        ],
      },
    ],
  },
};
