const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: outputPath,
  },
  module: {
    rules: [
      {
        enforce: 'pre', // 他のloaderよりも先に実行することができる
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }, // eslint追加
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }, // babel追加
      {
        test: /\.(sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // loaderは逆順（後ろから順）に読み込まれる。順番に注意しないとコンパイルエラー
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'url-loader', // 2kb以下だとBase64で読み込む
        options: {
          limit: 2048, // 2kb以上だとfile-loaderで読み込む(別ファイルとして読み込まれる)
          name: './images/[name].[ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  devServer: {
    contentBase: outputPath,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
  ],
  optimization: {
    minimizer: [
      // うまく動かないためコメントアウト（uglifyjsによるconsole.log自動削除）
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       drop_console: true,
      //     },
      //   },
      // }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  // devtoolsでエラー時にminifym前のsourceで確認できる
  devtool: 'eval-source-map',
};
