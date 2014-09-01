var expect = require('expect.js'),
    File = require('gulp-util').File,
    join = require('path').join;

var rebase = require('../');

describe('gulp-rebase', function() {
  var file, stream;
  beforeEach(function() {
    file = new File({
      base: join('this', 'path', 'is', 'fake')
    });
  });

  it('does root-based modification', function(done) {
    testRebase('^2', function(file) {
      expect(file.base).to.be(join('this', 'path'));
      done();
    });
  });

  it('does end-based modification', function(done) {
    testRebase('2$', function(file) {
      expect(file.base).to.be(join('is', 'fake'));
      done();
    });
  });

  it('does explicit modification', function(done) {
    testRebase('explicit/modification', function(file) {
      expect(file.base).to.be('explicit/modification');
      done();
    });
  });

  function testRebase(config, fn) {
    stream = rebase(config);
    stream.on('data', fn);
    stream.write(file);
    stream.end();
  }
});

