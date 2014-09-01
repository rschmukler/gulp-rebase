var through2 = require('through2');

var delim = require('path').sep;

var gulpRebase = module.exports = function(config) {
  var transformFn;

  if(/\^\d+/.test(config)) {
    var count = parseInt(config.match(/(\d)+/)[0], 10);
    transformFn = beginningPath(count);
  } else if(/\d+\$/.test(config)) {
    var count = parseInt(config.match(/(\d)+/)[0], 10);
    transformFn = endingPath(count);
  } else {
    transformFn = function(file) { file.base = config.split('/').join(delim); };
  }

  return through2.obj(function(file, enc, cb) {
    transformFn(file);
    this.push(file);
    cb();
  });
};

function beginningPath(count) {
  return function(file) {
    file.base = file.base.split(delim).slice(0, count).join(delim);
  };
}

function endingPath(count) {
  return function(file) {
    file.base = file.base.split(delim).slice(-1 * count).join(delim);
  };
}
