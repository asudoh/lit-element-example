/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint-disable global-require */

const path = require('path');

function normalizeBrowser(browser) {
  return (
    {
      chrome: `Chrome${process.env.TRAVIS ? '_Travis' : ''}`,
      firefox: 'Firefox',
      safari: 'Safari',
      ie: 'IE',
    }[browser.toLowerCase()] || browser
  );
}

module.exports = function setupKarma(config) {
  const { browsers, collectCoverage, noPruneShapshot, specs, random, updateSnapshot, verbose } = config.customConfig;

  config.set({
    basePath: '..',

    browsers: (browsers.length > 0 ? browsers : ['ChromeHeadless']).map(normalizeBrowser),

    frameworks: ['jasmine', 'snapshot'],

    client: {
      jasmine: {
        random: !!random,
      },
    },

    files: ['src/polyfills/index.ts', 'tests/utils/snapshot.js', 'tests/snapshots/**/*.md'].concat(
      specs.length > 0 ? specs : ['tests/karma-test-shim.js']
    ),

    preprocessors: {
      'src/**/*.[jt]s': ['webpack', 'sourcemap'], // For generatoring coverage report for untested files
      'tests/karma-test-shim.js': ['webpack', 'sourcemap'],
      'tests/spec/**/*.ts': ['webpack', 'sourcemap'],
      'tests/utils/**/*.js': ['webpack', 'sourcemap'],
      'tests/snapshots/**/*.md': ['snapshot'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-maps',
      resolve: {
        extensions: ['.js', '.ts'],
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
                    "@babel/plugin-proposal-optional-chaining",
                    "@babel/plugin-proposal-nullish-coalescing-operator",
                  ],
                },
              },
            ],
          },
          !collectCoverage
            ? {}
            : {
                test: /\.[jt]s$/,
                exclude: [__dirname, /__tests__/, path.resolve(__dirname, '../node_modules')],
                enforce: 'post',
                use: {
                  loader: 'istanbul-instrumenter-loader',
                  options: {
                    esModules: true,
                  },
                },
              },
        ],
      },
    },

    webpackMiddleware: {
      noInfo: !verbose,
    },

    customLaunchers: {
      Chrome_Travis: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-webpack'),
      require('karma-snapshot'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
    ],

    reporters: ['spec', ...(!collectCoverage ? [] : ['coverage-istanbul'])],

    coverageIstanbulReporter: {
      reports: ['html', 'text'],
      dir: path.join(__dirname, 'coverage'),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      verbose,
    },

    snapshot: {
      prune: !noPruneShapshot,
      update: updateSnapshot,
      pathResolver(basePath, suiteName) {
        return path.resolve(basePath, `tests/snapshots/${suiteName}.md`);
      },
    },

    port: 9876,

    colors: true,

    browserNoActivityTimeout: 60000,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    logLevel: verbose ? config.LOG_DEBUG : config.LOG_INFO,

    concurrency: Infinity,
  });
};
