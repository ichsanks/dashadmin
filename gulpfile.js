var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber');

var APP_PATH = 'app',
	DIST_PATH = 'dist',
	VIEWS_PATH = APP_PATH + '/pug/pages/**/*.pug',
	SCRIPTS_PATH = APP_PATH + '/js/**/*.js',
	SASS_PATH = APP_PATH + '/scss/**/*.scss';


// Views Index
gulp.task('index', function() {
	console.log('Starting index views task!');

	return gulp.src(APP_PATH + '/index.pug')
		.pipe(plumber(function(err) {
			console.log('Index views task error!');
			console.log(err);
			this.emit(err);
		}))
		.pipe(sourcemaps.init())
		.pipe(pug({
			pretty: true
		}))			
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Views
gulp.task('views', function() {
	console.log('Starting views task!');

	return gulp.src(VIEWS_PATH)
		.pipe(plumber(function(err) {
			console.log('Views task error!');
			console.log(err);
			this.emit(err);
		}))
		.pipe(sourcemaps.init())
		.pipe(pug({
			pretty: true
		}))			
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH + '/pages'))
		.pipe(livereload());
});

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

// CSS Plugins
gulp.task('cssplugins', function() {
	return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
		.pipe(gulp.dest(DIST_PATH + '/css'))		
});

// Fonts Plugins
gulp.task('fontplugins', function() {
	return gulp.src(['node_modules/font-awesome/fonts/*'])
		.pipe(gulp.dest(DIST_PATH + '/fonts'))		
});

// Watch
gulp.task('watch', ["index","views","styles","scripts","cssplugins","fontplugins"], function() {
	console.log('Starting watch task!')
	require('./server.js');
	livereload.listen();
	gulp.watch(APP_PATH + '/index.pug', ['index']);
	gulp.watch(VIEWS_PATH, ['views']);
	gulp.watch(APP_PATH + '/pug/templates/**/*.pug', ['index','views']);
	gulp.watch(SCRIPTS_PATH, ['scripts']);
	gulp.watch(SASS_PATH, ['styles']);
});