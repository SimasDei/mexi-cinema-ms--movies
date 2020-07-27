const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;
const mode = NODE_ENV === 'production' ? 'production' : 'development';
console.log(`Webpack Mode: ${mode}`);

module.exports = {
  entry: path.join(__dirname, 'src/index.ts'),
  target: 'node',
  mode,
  stats: 'minimal',
  devtool: 'nosources-source-map',
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  optimization: {
    minimize: mode === 'production',
    usedExports: mode === 'production',
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
          extractComments: false,
        },
      }),
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
};
