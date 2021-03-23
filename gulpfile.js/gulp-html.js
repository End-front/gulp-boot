const { src, dest, parallel, series, watch } = require('gulp');
const htmlValidator = require('gulp-w3c-html-validator');
const htmlmin = require('gulp-htmlmin');
const htmlTypeograf = require('gulp-typograf');

//TODO: https://www.npmjs.com/package/gulp-rev-all

function html() {
  return src(path.file.html)
  .pipe(plumber())
  .pipe(fileinclude(config.htmlInclude))
  .pipe(changedInPlace({firstPass: true}))
  .pipe( gulpif(config.htmlMini == true, 
    htmlmin({ collapseWhitespace: true }), 
    beautify.html({ "indent_size": 2, })) )
  .pipe(gulpif(config.typeograf, htmlTypeograf(config.typeograf)))
  .pipe(gulpif(config.walidator, htmlValidator()))
  .pipe(dest(path.build.html))
}

exports.html = html;