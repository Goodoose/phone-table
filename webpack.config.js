const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/js/scripts.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
  },
};
