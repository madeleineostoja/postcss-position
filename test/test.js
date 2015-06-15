var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

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
    test('a{ absolute: 0 0 0 0; }', 'a{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; }', { }, done);
  });

  it('handles two values', function (done) {
    test('a{ absolute: 0 0; }', 'a{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; }', { }, done);
  });

  it('handles different values', function (done) {
    test('a{ absolute: .1vw auto 50% 10px; }', 'a{ position: absolute; top: .1vw; right: auto; bottom: 50%; left: 10px; }', { }, done);
  });

});
