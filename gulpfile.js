var gulp = require('gulp');
var jade = require('gulp-jade');
var watchfiles = 'src/main/webapp/*.jade';

gulp.task('templates', function() {
	  var YOUR_LOCALS = {};

	  gulp.src(watchfiles)
	  	 .pipe(jade({
	  		 pretty: true
	  	 	}))
	    .pipe(gulp.dest('src/main/webapp/'))
	});

var webserver = require('gulp-webserver');

gulp.task('build', ['templates']);

gulp.task('default', function() {
	
	gulp.watch(watchfiles, ['templates']);
   gulp.src('src/main/webapp').pipe(webserver({
      livereload: true,
      open: 'http://0.0.0.0:8080/index.html',
      port: 8080,
      host: '0.0.0.0'
   }));
});