'use strict';

/*-----------------------------------------------------------
 GULP: DEPENDENCIES
 Define the variables of your dependencies in this section
-----------------------------------------------------------*/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    babel = require('gulp-babel');

/*-----------------------------------------------------------
 GULP : APP TASKS
 Necessary gulp tasks required to run your application like
 magic. Feel free to add more tasks in this area
-----------------------------------------------------------*/

gulp.task('sass', function () {
    gulp.src(['./app/scss/master.scss'])
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('./app/build/css'))
        .pipe(concat('master.css'))
        .pipe(gulp.dest('./app/build/css/'));
});

gulp.task('images', function () {
    console.log('Running image task -------------------->');
    gulp.src(['./app/images/*.*'])
        .pipe(gulp.dest('./app/build/images'))
});

gulp.task('js', function () {
    console.log('Running js task -------------------->');
    gulp.src(['./app/js/lib/*.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./app/build/js'))
});

gulp.task('js:components', function () {
    console.log('Running components task -------------------->');
    gulp.src(['./app/js/components/*.jsx', './app/js/*.jsx'])
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./app/build/js'))
});

gulp.task('browser-sync', function() {
    browserSync.init(["./app/*.html", "./app/js/*.jsx", "./app/js/lib/*.js", "./app/js/components/*.jsx", "./app/css/*.css", "./app/images/*.*", "./app/fonts/*.*"], {
        server: {
            baseDir: "./app/"
        }
    });
});

/*-----------------------------------------------------------
 GULP : WATCH TASKS
-----------------------------------------------------------*/
gulp.task('default', ['js', 'js:components', 'sass', 'images', 'browser-sync'], function () {
    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/js/**/*.jsx", "app/js/application.jsx", ['js:components']);
    gulp.watch("app/js/lib/*.js", ['js']);
});