const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync');
const fs = require("fs");

function initProject(cb) {
  var isNew = false; 

  fs.stat(source_folder, function(err, stats) {
    if (err) {
      fs.mkdirSync(source_folder)
      isNew = true;
    }
  })
  fs.stat(path.sourse.html, function(err, stats) {
    if (err) {
        isNew = true;
        fs.mkdirSync(path.sourse.html)
        fs.writeFile(path.sourse.html + "/index.html", '', function(err){
          if (err) {console.log(err);}
        })
        fs.mkdirSync(path.sourse.htmlModule)
    }
  })
  fs.stat(path.sourse.scss, function(err, stats) {
    if (err) {
      isNew = true;
      fs.mkdirSync(path.sourse.scss)
      fs.writeFile(path.sourse.scss + "/style.scss", '', function(err){
        if (err) {console.log(err);}
      })
      fs.mkdirSync(path.sourse.scss + "/generic")
      fs.mkdirSync(path.sourse.scss + "/lib")
    }
  })
  fs.stat(path.sourse.img, function(err, stats) {
    if (err) {
      isNew = true;
      fs.mkdirSync(path.sourse.img)
      fs.mkdirSync(path.sourse.img + "/favicon")
    }
  })
  fs.stat(path.sourse.fonts, function(err, stats) {
    if (err) {
      isNew = true;
      fs.mkdirSync(path.sourse.fonts)
    }
  })
  fs.stat(path.sourse.js, function(err, stats) {
    if (err) {
      isNew = true;
      fs.mkdirSync(path.sourse.js)
      fs.mkdirSync(path.sourse.jsVendor)
    }
  })
  fs.stat(project_folder, function(err, stats) {
    if (err) {
      isNew = true;
      fs.mkdirSync(project_folder)
  }
  })
  cb()
}

function browserssync(cb) {
  browserSync.init({ 
    server: {
        baseDir: project_folder + "/",
    },
    ui: {
      port: 80,
    },
    notify: false,
  });
  cb();
}

function reloadBrowser(cb) {
  src(path.file.scss) //Glob  аргумент
  .pipe(  browserSync.reload({stream: true}) )
  cb()
}

exports.initProject = initProject;
exports.reloadBrowser = reloadBrowser;
exports.browserssync = browserssync;