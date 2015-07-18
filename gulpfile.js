'use strict';
/*-----------------------------------------------------------
 GULP: DEPENDENCIES
 Define the variables of your dependencies in this section
-----------------------------------------------------------*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync');

/*-----------------------------------------------------------
 GULP : APP TASKS
 Necessary gulp tasks required to run your application like
 magic. Feel free to add more tasks in this area
-----------------------------------------------------------*/
gulp.task('sass', function () {
    gulp.src(['./app/scss/master.scss'])
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('./app/css'))
        .pipe(concat('master.css'))
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["./app/*.html", "./app/js/*.js", "./app/css/*.css", "./app/images/*.*", "./app/fonts/*.*"], {
        server: {
            baseDir: "./app/"
        }
    });
});

/*-----------------------------------------------------------
 GULP : WATCH TASKS
-----------------------------------------------------------*/
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("app/scss/*.scss", ['sass']);
});