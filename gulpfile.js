var gulp = require('gulp');
var jade = require('gulp-jade');
var react = require('gulp-react');
var watchfiles = 'client/*.jade';

var webrootdir = 'www';
var htmlfiles = 'client/**/*.html';
var cssfiles = 'client/css/**/*.css';
var jsfiles = 'client/js/**/*.js';

gulp.task('templates', function() {
	  var YOUR_LOCALS = {};

	  gulp.src(watchfiles)
	  	 .pipe(jade({
	  		 pretty: true
	  	 	}))
	    .pipe(gulp.dest(webrootdir))
	});

var webserver = require('gulp-webserver');

gulp.task('build', ['templates']);

gulp.task('copyhtml', function(){
	return gulp.src(htmlfiles).
		pipe(gulp.dest(webrootdir));

});

gulp.task('compilejs', function(){
	return gulp.src(jsfiles)
		.pipe(react())
		.pipe(gulp.dest(webrootdir+'/js'));
})

gulp.task('copycss', function(){
	return gulp.src(cssfiles).
		pipe(gulp.dest(webrootdir+'/css'));

});
gulp.task('default', ['copyhtml', 'copycss', 'compilejs'], function() {
	
	gulp.watch(htmlfiles, ['copyhtml']);
	gulp.watch(cssfiles, ['copycss']);
	gulp.watch(jsfiles, ['compilejs']);

	gulp.src(webrootdir).pipe(webserver({
      livereload: true,
      open: 'http://0.0.0.0:9001/index.html',
      port: 9001,
      host: '0.0.0.0'
   }));
});