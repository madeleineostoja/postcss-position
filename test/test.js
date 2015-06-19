/*eslint no-unused-expressions: 0*/
'use strict';

var postcss = require('postcss'),
    expect = require('chai').expect,
    plugin = require('../');

var test = function (input, output, opts, done) {
  postcss([ plugin(opts) ]).process(input).then(function (result) {
    expect(result.css).to.eql(output);
    expect(result.warnings()).to.be.empty;
    done();
  }).catch(function (error) {
    done(error);
  });
};

describe('postcss-position', function () {

  it('sets position and offsets', function (done) {
    test('a{ absolute: 10px 20px 30px 40px; }',
         'a{ position: absolute; top: 10px; right: 20px; bottom: 30px; left: 40px; }', { }, done);
  });

  it('handles one value', function (done) {
    test('a{ absolute: 0; }',
         'a{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; }', { }, done);
  });

  it('handles two values', function (done) {
    test('a{ absolute: 10px 0; }',
         'a{ position: absolute; top: 10px; right: 0; bottom: 10px; left: 0; }', { }, done);
  });

  it('handles three values', function (done) {
    test('a{ absolute: 10px auto 20px; }',
         'a{ position: absolute; top: 10px; right: auto; bottom: 20px; left: auto; }', { }, done);
  });

});
