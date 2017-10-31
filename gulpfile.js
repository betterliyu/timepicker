var gulp = require('gulp')
var rollup = require('rollup')
var eslint = require('rollup-plugin-eslint')
var resolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var uglify = require('rollup-plugin-uglify')
var minify = require('uglify-es').minify

var cssminify = require('gulp-minify-css')
var concat = require('gulp-concat')
// var uglify1 = require('gulp-uglify')
var rename = require('gulp-rename')

gulp.task('build', () => {
  return rollup.rollup({
    input: './src/timepicker.js',
    plugins: [
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        exclude: ['node_modules/**', 'dist/**']
      }),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs()]
  }).then(bundle => {
    bundle.write({
      format: 'umd',
      moduleName: 'bwidget.timepicker',
      dest: './dist/js/bwidget.timepicker.js',
      sourceMap: false
    })
  })
})
gulp.task('build:min', () => {
  return rollup.rollup({
    input: './src/timepicker.js',
    plugins: [
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        exclude: ['node_modules/**', 'dist/**']
      }),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs(),
      uglify({}, minify)]
  }).then(bundle => {
    bundle.write({
      format: 'umd',
      moduleName: 'bwidget.timepicker',
      dest: './dist/js/bwidget.timepicker.min.js',
      sourceMap: false
    })
  })
})
gulp.task('copyCss', function () {
  return gulp.src('src/css/*.css')
    .pipe(rename({ prefix: 'bwidget.' }))
    .pipe(gulp.dest('dist/css'))
})
gulp.task('minifyCss', function () {
  return gulp.src('src/css/*.css')
    .pipe(cssminify())
    .pipe(rename({ suffix: '.min', prefix: 'bwidget.' }))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('build:all', ['build', 'build:min', 'copyCss', 'minifyCss'])