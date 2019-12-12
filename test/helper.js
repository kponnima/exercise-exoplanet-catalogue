/*
 *  Mocha Server Unit Tests.
 *  UNIT TEST - helper module
 */

// import the required modules
let _sinon = require('sinon');
let _chai = require('chai');
let _expect = _chai.expect;
let _assert = _chai.assert;
let _should = _chai.should();

// declare the keywords globally, so that we don't have to declare them again in each individual tests
global.sinon = _sinon;
global.chai = _chai;
global.expect = _expect;
global.assert = _assert;
global.should = _should;