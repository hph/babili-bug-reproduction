import webpack from 'webpack';
import { resolve } from 'path';

import BabiliPlugin from 'babili-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import StatefulReactContainerPlugin from 'stateful-react-container-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import IncludeAssetsPlugin from 'html-webpack-include-assets-plugin';

const baseConfig = {
  entry: {
    main: './app',
  },
  output: {
    path: resolve('./build/'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new HtmlPlugin(),
    new StatefulReactContainerPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BabiliPlugin({}, {
      comments: false,
      sourceMap: true,
    }),
  ],
};

const workaroundConfig = {
  ...baseConfig,
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    ...baseConfig.plugins,
    new CopyPlugin([
      { from: './node_modules/react/dist/react.min.js' },
      { from: './node_modules/react-dom/dist/react-dom.min.js' },
    ]),
    new IncludeAssetsPlugin({
      assets: [
        'react.min.js',
        'react-dom.min.js',
      ],
      append: false,
    }),
  ],
};

module.exports = process.env.WITH_WORKAROUND
  ? workaroundConfig
  : baseConfig;
