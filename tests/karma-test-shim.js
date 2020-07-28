/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// For generating coverage report for untested files
const srcContext = require.context('../src', true, /^.*\.ts$/);
srcContext.keys().forEach(srcContext);

const specContext = require.context('.', true, /_spec\.ts$/);
specContext.keys().forEach(specContext);