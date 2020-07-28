/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const test = require('./gulp-tasks/test');

gulp.task('test:unit', test.unit);
gulp.task('test', gulp.task('test:unit'));

process.once('SIGINT', () => {
  process.exit(0);
});
