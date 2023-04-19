'use strict';

const commonTypes = require('..');
const assert = require('assert').strict;

assert.strictEqual(commonTypes(), 'Hello from commonTypes');
console.info('commonTypes tests passed');
