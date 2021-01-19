const { src, dest, parallel, series, watch } = require('gulp');
const babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;

function script() {
  return pipeline(
    src(path.file.js),
    plumber(),
    babel({
      presets: ['@babel/env']
    }),
    gulpif(config.uglify, uglify()),
    dest(path.build.js)
  );
}

function vendor() {
  return src(path.file.jsVendor)
  .pipe(dest(path.build.js + "/vendor"))
}

exports.script = parallel(script, vendor);