'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var scss = require('gulp-sass');
var rename = require('gulp-rename');

var path = {
  js: './dist/js/drawerfy.js',
  scss: './scss/main.scss',
  build: {
    js: './dist/js',
    css: './dist/css'
  }
};

gulp.task('js', function () {
  gulp.src(path.js)
    .pipe(uglify())
    .pipe(rename({ basename: 'drawerfy', suffix: '.min' }))
    .pipe(gulp.dest(path.build.js));
});

gulp.task('scss', function () {
  gulp.src(path.scss)
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(rename({ basename: 'drawerfy', suffix: '.min' }))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('watch', function () {
  gulp.watch(path.js, ['js']);
  gulp.watch(path.scss, ['scss']);
});

gulp.task('default',
  ['watch', 'js', 'scss']
);
