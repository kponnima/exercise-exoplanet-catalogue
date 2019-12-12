/*
 *  Mocha config file.
 *  JavaScript-based config file.
 */
'use strict';
module.exports = {
    recursive: true,
    diff: true,
    extension: ['js'],
    opts: './test/mocha.opts',
    package: './package.json',
    reporter: 'spec',
    colors: true,
    fulltrace: true,
    bail: true,
    slow: 75,
    timeout: 100000,
    ui: 'bdd'
};