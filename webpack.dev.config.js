const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    hot: true,
    static: path.resolve(__dirname, 'dist/index.html'),
    historyApiFallback: true,
  },
};
