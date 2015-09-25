'use strict';

/*-----------------------------------------------------------
 GULP: DEPENDENCIES
 Define the variables of your dependencies in this section
-----------------------------------------------------------*/

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	babelify = require('babelify'),
	babel = require('gulp-babel'),
	del = require('del');

/*-----------------------------------------------------------
 GULP : APP TASKS
 Necessary gulp tasks required to run your application like
 magic. Feel free to add more tasks in this area
-----------------------------------------------------------*/

gulp.task('sass', function () {
	gulp.src(['./app/scss/master.scss'])
		.pipe(sass({includePaths: ['scss']}))
		.pipe(gulp.dest('./build/css'))
		.pipe(concat('master.css'))
		.pipe(gulp.dest('./build/css/'));
});

gulp.task('images', function () {
	gulp.src(['./app/images/*.*'])
		.pipe(gulp.dest('./build/images'))
});

gulp.task('html', function () {
	gulp.src(['./app/*.html'])
		.pipe(gulp.dest('./build/'))
});

gulp.task('js',['js:components'], function () {
	gulp.src(['./app/js/lib/*.js'])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./build/js'))
});

gulp.task('js:components', function () {
	browserify('./app/js/app.jsx')
		.transform('babelify')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./build/js'))
});

gulp.task('browser-sync', function() {
	browserSync.init(["./app/*.html", "./app/js/*.jsx", "./app/js/lib/*.js", "./app/js/components/*.jsx", "./app/css/*.css", "./app/images/*.*", "./app/fonts/*.*"], {
		server: {
			baseDir: "./build/"
		}
	});
});

gulp.task('clean', function() {
	del(['./build'], function (path) {
	   console.log('Build folder is deleted\n');
	});
});

/*-----------------------------------------------------------
 GULP : WATCH TASKS
-----------------------------------------------------------*/
gulp.task('default', ['clean', 'html', 'sass', 'js','images', 'browser-sync'], function () {
	gulp.watch("app/scss/*.scss", ['sass']);
	gulp.watch(["app/js/**/*.jsx", "app/js/**/**/*.jsx", "app/js/*.jsx"], ['js:components']);
	gulp.watch("app/*.html", ['html']);
	gulp.watch("app/images/*.*", ['images']);
});