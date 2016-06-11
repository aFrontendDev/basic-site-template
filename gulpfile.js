'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var map = require('map-stream');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var pxtorem = require('gulp-pxtorem');
var autoprefixer = require('gulp-autoprefixer');

var pxtoremProperties = [
    'font-size',
    'line-height',
    'width',
    'height',
    'min-height',
    'margin',
    'margin-top',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'padding',
    'padding-top',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'border',
    'border-top',
    'border-bottom',
    'border-left',
    'border-right',
    'top',
    'bottom',
    'left',
    'right'
];

var jshintReporter = map(function (file, cb) {
    if (!file.jshint.success) {
        console.log('JSHINT fail in '+file.path);

        file.jshint.results.forEach(function (err) {
            if (err) {
                console.log(' '+file.path + ': line ' + err.error.line + ', col ' + err.error.character + ', code ' + err.error.code + ', ' + err.error.reason);
                process.exit(1);
            }
        });
    }
    cb(null, file);
});

gulp.task('clean-styles', function () {
    return gulp.src('./dist/*.css')
        .pipe(clean());
});

gulp.task('clean-scripts', function () {
    return gulp.src('./dist/*.js')
        .pipe(clean());
});

gulp.task('jslint', ['clean-scripts'], function () {
    return gulp.src('./js/modules/*.js')
        .pipe(jshint())
        //.pipe(jshint.reporter('fail'));
        .pipe(jshintReporter);
});

gulp.task('concatjs', ['jslint'], function() {
    return gulp.src([
            './js/plugins/*.js',
            './js/modules/*.js',
            './js/*.js'
        ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', ['clean-styles'], function () {
    return gulp.src('./sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('autoprefixer', ['sass'], function () {
    return gulp.src('dist/style.css')
        .pipe(autoprefixer({
            browsers: [
                'last 3 versions',
                'ie 9'
            ],
            cascade: true
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('pxtorem', ['sass', 'autoprefixer'], function () {
    return gulp.src('dist/style.css')
        .pipe(pxtorem({
            root_value: 16,
            unit_precision: 5,
            prop_white_list: pxtoremProperties,
            replace: true,
            min_pixel_value: 2,
            media_query: true
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', ['jslint', 'concatjs']);

gulp.task('styles', ['sass', 'autoprefixer', 'pxtorem']);

gulp.task('default', ['scripts', 'styles']);

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['styles']);
});