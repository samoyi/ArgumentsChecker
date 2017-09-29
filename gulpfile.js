;"use strict";

const fs = require("fs"),
    path = require('path');

const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'), // 执行 uglify 任务是如果发现错误可以显示错误位置
    babel = require('gulp-babel');




gulp.task('compile', function(){
    gulp.src('./src/ArgumentsChecker.js')
        .pipe(babel({presets: ['env']}))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('./dest'));
});
gulp.task('default',function(){
    gulp.watch('./src/ArgumentsChecker.js',['compile']);
});