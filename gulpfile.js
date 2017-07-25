var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

var APP_PATH = 'app';
var DIST_PATH = 'dist';
var SCRIPTS_PATH = APP_PATH + '/js/**/*.js';
var SASS_PATH = APP_PATH + '/scss/**/*.scss';

// Styles
gulp.task('styles', function() {
	console.log('Starting styles task!');

	return gulp.src(SASS_PATH)
		.pipe(plumber(function(err) {
			console.log('Styles task error!');
			console.log(err);
			this.emit(err);
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass(function() {
			ouputStyles: 'compressed'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH + '/css'))
		.pipe(livereload());
});

// Scripts
gulp.task('scripts', function() {
	console.log('Starting scripts task!');

	return gulp.src(SCRIPTS_PATH)
		.pipe(plumber(function(err) {
			console.log('Scripts task error!');
			console.log(err);
			this.emit(err);
		}))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH + '/js'))
		.pipe(livereload());
});

// Images

// Watch
<<<<<<< HEAD
gulp.task('watch', ['scripts','styles'], function() {
=======
gulp.task('watch', ["styles","scripts"], function() {
>>>>>>> 6a477d71bf97b3bb090abdf5c527c4e0b656fa28
	console.log('Starting watch task!')
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
	gulp.watch(SASS_PATH, ['styles']);
})