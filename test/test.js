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
    test('a{ position: absolute 10px 20px 30px 40px; }',
         'a{ position: absolute; top: 10px; right: 20px; bottom: 30px; left: 40px; }', { }, done);
  });

  it('handles one value', function (done) {
    test('a{ position: absolute 0; }',
         'a{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; }', { }, done);
  });

  it('handles two values', function (done) {
    test('a{ position: absolute 10px 0; }',
         'a{ position: absolute; top: 10px; right: 0; bottom: 10px; left: 0; }', { }, done);
  });

  it('handles three values', function (done) {
    test('a{ position: absolute 10px auto 20px; }',
         'a{ position: absolute; top: 10px; right: auto; bottom: 20px; left: auto; }', { }, done);
  });

  it('handles multiple declarations', function (done) {
    test('a{ position: absolute 0; foo: bar; position: relative auto; }',
         'a{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; foo: bar; position: relative; top: auto; right: auto; bottom: auto; left: auto; }', { }, done);
  });

  it('handles calc', function (done) {
    test('a{ position: absolute calc(100vh - 10px) false false false; }',
         'a{ position: absolute; top: calc(100vh - 10px); }', { }, done);
  });

  it('handles rem units', function (done) {
    test('a{ position: absolute false 2rem 2rem false; }',
         'a{ position: absolute; right: 2rem; bottom: 2rem; }', { }, done);
  });

  describe('falsey removes', function() {
     it('offsets with false are skipped', function (done) {
        test('a{ position: absolute 10px false 30px false; }',
             'a{ position: absolute; top: 10px; bottom: 30px; }', { }, done);
     });

     it('offsets with null are skipped', function (done) {
        test('a{ position: absolute 10px null 30px null; }',
             'a{ position: absolute; top: 10px; bottom: 30px; }', { }, done);
     });

     it('offsets with false are inherrited', function (done) {
        test('a{ position: absolute 10px false; }',
             'a{ position: absolute; top: 10px; bottom: 10px; }', { }, done);
     });
  });

});
