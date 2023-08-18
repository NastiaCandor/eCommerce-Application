const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
  },
};
