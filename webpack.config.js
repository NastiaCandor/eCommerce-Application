const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, './src/index'),
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', "sass-loader"],
      },
      {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
      },
      {
          test: /\.ts$/i, use: 'ts-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i, 
        type: 'asset/resource',
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
    }
    ],
  },
  resolve: {
      extensions: ['.js', '.ts'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: (ext) => ext === 'ico' ? 'assets/[name][ext]' : 'assets/img/[name][ext]',
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/index.html'),
          filename: 'index.html',
          title: 'Vinyl Vibe Store',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/favicon.ico'),
            to: path.resolve(__dirname, 'dist/assets/favicon.ico'), 
          }
        ]
      }),
      new ESLintPlugin({ extensions: 'ts' }),
  ],
}

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(config, envConfig);
};