const { src, dest, parallel, series, watch } = require('gulp');
global.pathPlugin = require('path');
const config = require('./config.js');
global.fileinclude = require('gulp-file-include');
global.plumber = require('gulp-plumber');
global.cache = require('gulp-cached');
global.changedInPlace = require('gulp-changed-in-place');
global.gulpif = require('gulp-if');
global.gulpFilter = require('gulp-filter');
global.tap = require('gulp-tap');
global.beautify = require('gulp-beautify');
global.del = require('del');

const myCore = require('./gulp-core.js');
const myScss = require('./gulp-scss.js');
const myJs = require('./gulp-js.js');
const myHtml = require('./gulp-html.js');
const myImage = require('./gulp-image.js');
const myFonts = require('./gulp-fonts.js');


function watchFile(cb) {
  watch([path.file.html, path.file.htmlModule], series(myHtml.html, myCore.reloadBrowser)),
  watch(path.file.img, series(myImage.image, myCore.reloadBrowser)),
  watch([path.file.scssModule, path.file.scss], series(myScss.scss, myCore.reloadBrowser)),
  watch(path.file.fonts, series(myFonts.fonts, myCore.reloadBrowser)), 
  watch([path.file.js, path.file.jsVendor], series(myJs.script, myCore.reloadBrowser)),
  cb()
}

exports.initProject = myCore.initProject;
exports.html = myHtml.html;
exports.css = myScss.scss;
exports.script = myJs.script;
exports.image = myImage.image;
exports.cleanImage = myImage.cleanImage;
exports.fonts = myFonts.fonts;
exports.watch = watchFile;
exports.allTask = series( myImage.cleanImage, parallel(myHtml.html, myScss.scss, myJs.script, myImage.image, myFonts.fonts) );
exports.default = series(myCore.initProject, myCore.browserssync, watchFile)