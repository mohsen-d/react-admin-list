const webpack = require("webpack");
const path = require("path");

const srcPath = path.resolve(__dirname, "./examples/index.js");
const distPath = path.resolve(__dirname, "./examples/dist");

var PROJECT_URL = {
  production: JSON.stringify("/react-admin-list/"),
  development: JSON.stringify("/"),
};

module.exports = (env, argv) => {
  console.log(argv.mode, PROJECT_URL[argv.mode]);
  return {
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
    plugins: [
      new webpack.DefinePlugin({
        PROJECT_URL: PROJECT_URL[argv.mode],
      }),
    ],
  };
};
