const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const esbuild = require('gulp-esbuild');
const path = require('path');

function sync(cb) {
  browserSync.init({
    proxy: "localhost:8888/dumas",
    notify: false,
    open: false,
  });
  gulp.watch(['sass/**/*.scss', 'tailwind.config.js'], style);
  gulp.watch(['**/*.html', '**/*.php'], gulp.series(reload, style));
  gulp.watch('src/**/*.js', gulp.series(reload, js));
  browserSync.watch(['**/language/*.php', '**/cms/**', 'views/**']).on('change', browserSync.reload);
  cb();
}

function reload(cb) {
  browserSync.reload();
  cb();
}

function js() {
  return gulp.src('src/main.js')
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(esbuild({
      bundle: true,
      minify: true,
      sourcemap: true,
      target: ['es2020'],
      format: 'iife',
      platform: 'browser',
      mainFields: ['module', 'browser', 'main'],
      resolveExtensions: ['.mjs', '.js', '.json', '.frag', '.vert'],  // 添加擴展名
      nodePaths: [path.join(process.cwd(), 'node_modules')],
      loader: {
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.frag': 'text',  // 添加 fragment shader 加載器
        '.vert': 'text'   // 添加 vertex shader 加載器
      },
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function style() {
  return gulp.src('sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('stylesheets'))
    .pipe(browserSync.stream());
}

exports.js = js;
exports.style = style;
exports.default = gulp.series(style, js, sync);