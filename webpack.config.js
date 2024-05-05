const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)(\?\S*)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|webm)(\?\S*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: Infinity,
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/source",
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
    },
  },
  resolve: {
    alias: {
      // Needed when library is linked via `npm link` to app
      react: path.resolve("./node_modules/react"),
    },
  },
};
