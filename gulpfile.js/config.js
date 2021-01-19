const { tree } = require("gulp");

global.project_folder = 'dist';
global.source_folder = 'app';
    
global.path = {
  sourse: {
    html: source_folder + "/html",
    htmlModule: source_folder + "/html/include",
    scss: source_folder + "/scss",
    fonts: source_folder + "/fonts",
    img: source_folder + "/img",
    js: source_folder + "/js",
    jsVendor: source_folder + "/js/vendor"
  },
  build: {
    html: project_folder + "/",
    css: project_folder + "/css",
    fonts: project_folder + "/fonts",
    img: project_folder + "/img", 
    js: project_folder + "/js"
  },
  file: {},
}

path.file.html = path.sourse.html + "/*.html";
path.file.htmlModule = path.sourse.htmlModule + "/**/*.html";

path.file.scss = path.sourse.scss + "/*.scss";
path.file.scssModule = path.sourse.scss + "/**/_*.scss";
path.file.bootstrap = path.sourse.scss + '/bootstrap-edit.scss';
path.file.bootstrapModule = path.sourse.scss + "/bootstrap4/**/_*.scss"

path.file.fonts = path.sourse.fonts + "/**/*.*";

path.file.img = path.sourse.img + "/**/*.{jpg,png,svg,gif,ico,webp}";

path.file.js = path.sourse.js + "/*.js";
path.file.jsVendor = path.sourse.jsVendor + "/**/*.js";

global.config = {
  mode: 'custom', //'product', 'develop'
  walidator: true,
  csso: false,
  sourcemaps: true,
  webpImage: true,
  uglify: true,
  htmlMini: false,
  htmlInclude: {
    prefix: '@@',
    basepath: '@file',
    context: {
      desc: '',
      classBody: '',
    }
  },
  uncssBootstrap: {
    html: [path.file.html, path.file.htmlModule, path.build.html + "**/*.html"],
    ignore: ['']
  },
  mediaEx: {
    output: {
      path: pathPlugin.join(__dirname, '../dist/css/media'),
      name: '[query].[ext]'
    },
    queries: {
      '(min-width: 36em)' : 'media-sm', //'(min-width: 576px)': 'media-sm',
      '(min-width: 48em)' : 'media-md', //'(min-width: 768px)': 'media-md',
      '(min-width: 62em)' : 'media-lg', //'(min-width: 992px)': 'media-lg',
      '(min-width: 75em)' : 'media-xl', // '(min-width: 1200px)': 'media-xl',
      '(min-width: 88em)' : 'media-xxl', //'(min-width: 1400px)': 'media-xxl',
      '(min-width: 100em)': 'media-max', //'(min-width: 1600px)': 'media-max',
    },
    extractAll: false,
  },
  sass: {
    outputStyle: 'expanded'
  },
  doiuse: {
    browsers: [
      "> 0.1%",
      "last 10 versions",
      "not ie 5.5-10",
      "not dead",
    ],
    ignore: ['rem', "css-appearance", 'fontface', "viewport-units", "flexbox", "outline", "border-radius", "calc", "transforms2d"], 
  },
  responsiveImg: {
    "*-rs.*": [
      {
        width: "50%",
        rename: { suffix: '-x1' }
      },
      {
        width: "75%",
        rename: { suffix: '-x2' }
      },
      {
        width: "100%",
        rename: { suffix: '-x3' }
      }
    ],
  }
};

if (config.mode == 'product') {
  config.walidator = true;
  config.csso = true;
  config.sourcemaps = false;
  config.uglify = true;
  config.htmlMini = true;
  config.uncssBootstrap = {
    html: [path.file.html, path.file.htmlModule, path.build.html + "**/*.html"],
    ignore: ['']
  };
} else if (config.mode == 'develop') {
  config.walidator = true;
  config.csso = false;
  config.sourcemaps = true;
  config.uglify = false;
  config.htmlMini = false; 
  config.uncssBootstrap = false;
}