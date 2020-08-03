/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-modules', '@babel/preset-typescript'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          require.resolve('./tools/css-result-loader'),
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('./tools/postcss-fix-host-pseudo')(),
                require('autoprefixer')({
                  browsers: ['last 1 version', 'ie >= 11'],
                }),
              ],
              sourceMap: true,
            },
          },
          {
            loader: 'fast-sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules')],
              data: `
                $feature-flags: (
                  enable-css-custom-properties: true,
                );
              `,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  resolve: {
    extensions: ['.js', '.ts', '.d.ts'],
  },
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, 'src'),
    publicPath: '/dist',
  },
};
