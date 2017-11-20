"use strict";

const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel');




gulp.task('compile', function(){
    gulp.src('./src/ArgumentsChecker.js')
        .pipe(babel({presets: ['env']}))
        .pipe(uglify().on('error', gutil.log))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dest'));
});


gulp.task('default',function(){
    gulp.watch('./src/ArgumentsChecker.js',['compile']);
});
