const source_folder = "src";

const gulp = require("gulp"),
  plumber = require("gulp-plumber"),
  sass = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  sourcemaps = require("gulp-sourcemaps"),
  shorthand = require("gulp-shorthand"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  babel = require("gulp-babel"),
  terser = require("gulp-terser"),
  del = require("del"),
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  webpHTML = require("gulp-webp-html"),
  fileinclude = require("gulp-file-include"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  fonter = require("gulp-fonter"),
  webpcss = require("gulp-webpcss"),
  server = require("browser-sync").create();

let fs = require("fs");

let path = {
  build: {
    html: "build/",
    php: "build/",
    js: "build/js/",
    css: "build/css/",
    img: "build/img/",
    fonts: "build/fonts/",
    libsJs: "build/libs/js/",
    libsCss: "build/libs/css/",
  },
  src: {
    html: "src/**/*.html",
    php: "src/**/*.php",
    js: "src/js/**/*.js",
    style: "src/scss/**/*.scss",
    img: "src/img/*.{gif,png,jpg,svg,webp}",
    fonts: "src/fonts/**/*.*",
    libsJs: "src/libs/js/",
    libsCss: "src/libs/css/",
  },
  watch: {
    html: "src/**/*.html",
    php: "src/**/*.php",
    js: "src/js/**/*.js",
    style: "src/style/**/*.scss",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*",
  },
  clean: "./build",
};

let libsJsArray = [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js",
  "node_modules/jquery-mask-plugin/dist/jquery.mask.min.js",
  "node_modules/owl.carousel/dist/owl.carousel.min.js",
  "node_modules/aos/dist/aos.js",
];

let libsCssArray = [
  "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css",
  "node_modules/owl.carousel/dist/assets/owl.carousel.min.css",
  "node_modules/aos/dist/aos.css",
];

function clean(done) {
  return del(path.clean).then(() => {
    done();
  });
}

function styles(done) {
  return (
    gulp
    .src(path.src.style)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(shorthand())
    .pipe(
      cleanCSS({
          debug: true,
          compatibility: "*",
        },
        (details) => {
          console.log(
            `${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`
          );
        }
      )
    )
    .pipe(sourcemaps.write())
    .pipe(concat("styles.min.css"))
    .pipe(webpcss({
      webpClass: '.webp',
      noWebpClass: '.no-webp'
    }))
    .pipe(gulp.dest(path.build.css)),
    done()
  );
}

function scripts(done) {
  return (
    gulp
    .src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest(path.build.js)),
    done()
  );
}

function libsCss(done) {
  return (
    gulp
    .src(libsCssArray)
    .pipe(
      cleanCSS({
          debug: true,
          compatibility: "*",
        },
        (details) => {
          console.log(
            `${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`
          );
        }
      )
    )
    .pipe(concat("libs.css"))
    .pipe(gulp.dest(path.build.libsCss)),
    done()
  );
}

function libsJs(done) {
  return (
    gulp
    .src(libsJsArray)
    .pipe(terser())
    .pipe(concat("libs.js"))
    .pipe(gulp.dest(path.build.libsJs)),
    done()
  );
}

function fonts(done) {
  gulp.src(path.src.fonts).pipe(ttf2woff()).pipe(gulp.dest(path.build.fonts));

  return (
    gulp
    .src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.build.fonts)),
    done()
  );
}

function html() {
  return gulp
    .src(path.src.html)
    .pipe(fileinclude())
    .pipe(plumber())
    .pipe(webpHTML())
    .pipe(gulp.dest(path.build.html));
}

function php() {
  return gulp
    .src(path.src.php)
    .pipe(plumber())
    .pipe(webpHTML())
    .pipe(gulp.dest(path.build.html));
}

function imageMinify() {
  return gulp
    .src(path.src.img)
    .pipe(
      webp({
        qualitiy: 70,
      })
    )
    .pipe(gulp.dest(path.build.img))
    .pipe(gulp.src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: true,
        }, ],
        interlaced: true,
        optimizationLevel: 3,
      })
    )
    .pipe(gulp.dest(path.build.img));
}

function otf2ttf() {
  return gulp
    .src("src/fonts/*.otf")
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(gulp.dest("src/fonts/"));
}

function fontsStyle(done) {

  let file_content = fs.readFileSync(source_folder + '/scss/_fonts.scss');
  if (file_content == '') {
    fs.writeFile(source_folder + '/scss/_fonts.scss', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(source_folder + '/scss/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    })
  }

  done();
}

function cb() {}

function watch(cb) {
  server.init({
    proxy: "rielt.loc",
  });

  gulp
    .watch(path.watch.img, gulp.series(imageMinify))
    .on("change", server.reload);
  gulp.watch(
    "src/scss/**/*.scss",
    gulp.series(styles, (cb) =>
      gulp.src("build/css").pipe(server.stream()).on("end", cb)
    )
  );
  gulp.watch(path.watch.js, gulp.series(scripts)).on("change", server.reload);
  gulp.watch(path.watch.html, gulp.series(html)).on("change", server.reload);
  gulp.watch(path.watch.php, gulp.series(php)).on("change", server.reload);

  cb();
}

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.otf2ttf = otf2ttf;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.html = html;
exports.php = php;
exports.imageMinify = imageMinify;
exports.libsCss = libsCss;
exports.libsJs = libsJs;


exports.watch = watch;

const dev = gulp.parallel(
  styles,
  scripts,
  otf2ttf,
  fonts,
  html,
  imageMinify,
  libsCss,
  libsJs
);

exports.default = gulp.series(clean, watch, dev, fontsStyle);