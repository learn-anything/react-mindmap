const path = require('path');

module.exports = {
  entry: './src/index.jsx',

  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'MindMap',
  },

  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    alias: { 'd3': path.resolve(__dirname, 'dist/d3.min.js') },
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
};
