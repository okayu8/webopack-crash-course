const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: outputPath,
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }, // babel追加
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // loaderは逆順（後ろから順）に読み込まれる。順番に注意しないとコンパイルエラー
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"], // loaderは逆順（後ろから順）に読み込まれる。順番に注意しないとコンパイルエラー
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: "url-loader", // 2kb以下だとBase64で読み込む
        options: {
          limit: 2048, // 2kb以上だとfile-loaderで読み込む(別ファイルとして読み込まれる)
          name: "./images/[name].[ext]",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    contentBase: outputPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
};
