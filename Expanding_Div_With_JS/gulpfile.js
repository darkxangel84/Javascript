'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create();

/*gulp.task("concatScripts", function() {
	gulp.src([
		'nameofjsfile.js',
		'nameofjsfile.js', //put your js files here...
		'nameofjsfile.js']);
	.pipe(concat("app.js"))
	.pipe(gulp.dest("js"));
});*/

gulp.task('compileSass', function() {
	return gulp.src("scss/application.scss")
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task("build", ['compileSass'], function(){
	return gulp.src(["css/appliation.css", "js/app.js"], { base: './'})
	.pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

	gulp.watch('scss/*.scss', ['compileSass']);
	gulp.watch('js/*.js', ['build']);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task("default", ['browser-sync']);


