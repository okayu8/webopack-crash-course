const path = require("path");

const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // loaderは逆順（後ろから順）に読み込まれる。順番に注意しないとコンパイルエラー
      },
    ],
  },
  devServer: {
    contentBase: outputPath,
  },
};
