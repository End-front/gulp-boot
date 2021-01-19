const { src, dest, parallel, series, watch } = require('gulp');

function fonts() {
  return src(path.file.fonts)
  .pipe(dest(path.build.fonts))
} 

exports.fonts = fonts; 