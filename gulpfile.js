'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var del = require('del');
var run = require('run-sequence');
var server = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');

gulp.task('style', function () {
  gulp.src('sass/style.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer({browsers: [
          'last 2 versions',
          'IE 11',
          'Firefox ESR'
        ]})
      ]))
      .pipe(gulp.dest('css'))
      .pipe(minify())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('css'))
      .pipe(server.stream());
});

// Оптимизация графики
gulp.task('images', function() {
  return gulp.src('img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('images'));
});

// Копирование файлов для сборки
gulp.task('copy', function () {
  return gulp.src([
    'fonts/*.{woff,woff2}',
    'images/**',
    'css/*.min.css',
    '*.html'
  ], {
    base: '.'
  })
      .pipe(gulp.dest('build'));
});

// Очистка билда
gulp.task('clean', function () {
  return del('build');
});

// Cборка билда
gulp.task('build', function (done) {
  run(
      'clean',
      'style',
      'copy',
      done
  );
});

// Публикация проекта на гитхаб
gulp.task('deploy', function () {
  return gulp.src('./build/**/*')
      .pipe(ghPages());
});


gulp.task('serve', ['style'], function () {
  server.init({
    server: '.',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html').on('change', server.reload);
});
