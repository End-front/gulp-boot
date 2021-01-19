const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const postscss = require('postcss-scss');
const doiuse = require('doiuse');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const flexbugs = require('postcss-flexbugs-fixes');
const mediaEx = require('postcss-extract-media-query');
const mediaComb = require('postcss-combine-media-query');
const csso = require('gulp-csso');
const uncss = require('postcss-uncss');

const logmy = require('fancy-log');


function scss() {
  if (config.doiuse) {
    src([path.file.scssModule, path.file.scss, '!' + path.file.bootstrapModule, '!' + path.file.bootstrap])
    .pipe(postcss([ doiuse(config.doiuse)], {
      syntax: postscss,
      parser: postscss,
    }))
  }

  var maps = gulpFilter(['**/*.css', '!**/*.css.map'], {restore: true});

  return src([path.file.scss, '!' + path.file.bootstrapModule, '!' + path.file.bootstrap])
  .pipe(plumber())
  .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
  .pipe(sass(config.sass))
  .pipe(postcss([mediaComb()]))
  .pipe(gulpif(config.mediaEx, postcss([mediaEx(config.mediaEx)])))
  .pipe(gulpif(config.csso, csso()))
  .pipe(postcss([flexbugs({ bug6: false })]))
  .pipe(postcss([autoprefixer()]))
  .pipe(gulpif(config.sourcemaps, sourcemaps.write('./maps')))
  .pipe(dest(path.build.css))
}

function bootstrap() {
  return src([path.file.bootstrap])
  .pipe(plumber())
  .pipe(gulpif(config.sourcemaps, sourcemaps.init()))
  .pipe(sass(config.sass))
  .pipe(gulpif(config.uncssBootstrap, postcss([uncss(config.uncssBootstrap)])))
  .pipe(postcss([mediaComb()]))
  .pipe(gulpif(config.mediaEx, postcss([mediaEx(config.mediaEx)])))
  .pipe(gulpif(config.csso, csso()))
  .pipe(postcss([autoprefixer()]))
  .pipe(gulpif(config.sourcemaps, sourcemaps.write('./maps')))
  .pipe(dest(path.build.css))
}

function media(cb) {
  if (config.gcmq) {
    return src([path.build.css + '/media/*.css'])
    .pipe(postcss([flexbugs({ bug6: false })]))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulpif(config.csso, csso()))
    .pipe(dest(path.build.css + '/media'))
  } else {
    cb()
  }
}

exports.scss = series(scss, media);
exports.bootstrap = bootstrap;



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