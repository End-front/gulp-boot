const { src, dest, parallel, series, watch } = require('gulp');
const minImage = require('gulp-image');
const webp = require('gulp-webp');
const responsive = require('gulp-responsive');

function cleanImage(cb) {
  del(path.build.img)
  cb()
}

function imageAll() {
  var notOptimazed = gulpFilter(['**/*.*', '!**/*-notopt.*'], {restore: true});

  return src(path.file.img)
  .pipe(cache('image'))
  .pipe(plumber())
  .pipe(gulpif(config.responsiveImg, responsive(config.responsiveImg, {
    errorOnUnusedConfig: false,
    errorOnUnusedImage: false,
    passThroughUnused: true,
  })))
  .pipe(notOptimazed)
  .pipe(minImage({
    svgo: ["--disable", "removeViewBox"]
  }))
  .pipe(notOptimazed.restore)
  .pipe(dest(path.build.img))
}

function imageWebp(cb) {
  if(config.webpImage) {
    return src(path.file.img)
    .pipe(plumber())
    .pipe(webp())
    .pipe(cache('image'))
    .pipe(gulpif(config.responsiveImg, responsive(config.responsiveImg, {
      errorOnUnusedConfig: false,
      errorOnUnusedImage: false,
      passThroughUnused: true,
    })))
    .pipe(dest(path.build.img))
  } else {
    cb()
  }
}

exports.cleanImage = cleanImage;
exports.image = parallel(imageAll, imageWebp);