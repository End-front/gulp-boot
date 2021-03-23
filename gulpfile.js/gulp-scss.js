const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const postscss = require('postcss-scss');
const doiuse = require('doiuse');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const flexbugs = require('postcss-flexbugs-fixes');
// const mediaEx = require('postcss-extract-media-query');
const mediaComb = require('postcss-sort-media-queries');
const csso = require('gulp-csso');
const uncss = require('postcss-uncss');

const logmy = require('fancy-log');

function allStyle() {
  if (config.doiuse) {
    src([path.file.scssModule, path.file.scss, '!' + path.file.bootstrapModule, '!' + path.file.bootstrap])
    .pipe(postcss([ doiuse(config.doiuse)], {
      syntax: postscss,
      parser: postscss,
    }))
  }

  var maps = gulpFilter(['**/*.css', '!**/*.css.map'], {restore: true});
  var onlyBootstrap = gulpFilter(['**/bootstrap-edit.css'], {restore: true})
  var mediaFilter = gulpFilter(['**/*.css', '!**/media-*.css'], {restore: true})

  return src([path.file.scss])
  .pipe(plumber())
  .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
  .pipe(sass(config.sass))
  .pipe(changedInPlace({firstPass: true}))
  .pipe(gulpif(config.uncssBootstrap, onlyBootstrap))
  .pipe(gulpif(config.uncssBootstrap, postcss([uncss(config.uncssBootstrap)])))
  .pipe(gulpif(config.uncssBootstrap, onlyBootstrap.restore))
  .pipe(postcss([mediaComb()]))
  .pipe(gulpif(config.csso, csso()))
  .pipe(postcss([flexbugs({ bug6: false })]))
  .pipe(postcss([autoprefixer()]))
  .pipe(gulpif(config.sourcemaps, sourcemaps.write('./maps')))
  .pipe(dest(path.build.css))
}

exports.scss = allStyle;

// Если нужно после sourcemap добавить плагины и они ставять ссылку на карту не в конец
// .pipe(maps)
// 
//.pipe(tap(function(file) {
//   file.contents = Buffer.concat([
//       file.contents,
//       Buffer.from('\n/*# sourceMappingURL=maps/' + file.path.split('\\').reverse()[0] + '.map */ \n'),
//   ]);
//  }))
//
// .pipe(maps.restore)