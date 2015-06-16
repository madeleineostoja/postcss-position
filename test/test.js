var postcss = require('postcss'),
    expect  = require('chai').expect,
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
  var input = '',
    output = '',
    opts = {};

  afterEach(function(done) {
    test(input, output, opts, done);
  });

  it('sets position and offsets', function () {
    input = 'a{ absolute: 0 0 0 0; }';
    output = 'a{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; }';
  });

  it('handles two values', function () {
    input = 'a{ absolute: 0 0; }';
    output = 'a{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; }';
  });

  it('handles different values', function () {
    input = 'a{ absolute: .1vw auto 50% 10px; }';
    output = 'a{ position: absolute; top: .1vw; right: auto; bottom: 50%; left: 10px; }';
  });

});
