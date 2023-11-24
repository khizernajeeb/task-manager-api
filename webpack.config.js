const path = require("path");

module.exports = {
  target: "node",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, "src"),
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
        },
      },
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          import: true,
        },
      },
    ],
  },
  // Additional configuration goes here
};
