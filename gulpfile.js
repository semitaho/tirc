var gulp = require('gulp');
var jade = require('gulp-jade');
var babelify = require("babelify");
var source = require('vinyl-source-stream');

var watchfiles = 'client/*.jade';
var browserify = require('browserify');
var webrootdir = 'www';
var htmlfiles = 'client/**/*.html';
var cssfiles = 'client/css/**/*.css';
var imagefiles = 'client/images/*';
var jsfiles = 'client/js/**/*.js';
var jsxfiles = 'client/js/**/*.jsx';
var jsvendorfiles = 'client/js/vendor/**';
var mainjsfile = 'client/js/app.js';

gulp.task('templates', function () {
  var YOUR_LOCALS = {};

  gulp.src(watchfiles)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(webrootdir))
});

var webserver = require('gulp-webserver');

gulp.task('build', ['templates']);

gulp.task('copyhtml', function () {
  return gulp.src(htmlfiles).
    pipe(gulp.dest(webrootdir));
});

gulp.task('compilejs', function () {
  return browserify({
    entries:  mainjsfile,
    extensions: ['.js', '.jsx'],
    debug: true
  })
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('www/js'));
});

gulp.task('copyjs', function(){
  return gulp.src(jsvendorfiles)
    .pipe(gulp.dest(webrootdir+'/js/vendor'));
});

gulp.task('copycss', function () {
  return gulp.src(cssfiles).
    pipe(gulp.dest(webrootdir + '/css'));

});

gulp.task('copyimages', function () {
  return gulp.src(imagefiles).
    pipe(gulp.dest(webrootdir + '/images'));

});

gulp.task('test', function () {
  return gulp.src('client/tests')
    .pipe(jest({
      scriptPreprocessor: 'client/tests/preprocessor.js',
      testDirectoryName: 'spec/reducers',
      modulePathIgnorePatterns: [],
      unmockedModulePathPatterns: ["react", "jquery", "components", "services", '../../node_modules', 'ReactUpdates'],
      moduleFileExtensions: ['js', 'jsx', 'json', 'react']
    }));

});

gulp.task('default', ['copyhtml', 'copycss', 'compilejs', 'copyjs', 'copyimages'], function () {

  gulp.watch(htmlfiles, ['copyhtml']);
  gulp.watch(cssfiles, ['copycss']);
  gulp.watch([jsfiles, jsxfiles], ['compilejs']);
  var TARGET_URL = "http://localhost:8880";

  gulp.src(webrootdir).pipe(webserver({
    livereload: true,
    open: 'http://0.0.0.0:9001/index.html',
    port: 9001,
    host: '0.0.0.0',
    proxies: [{
      source: '/backend/connect',
      target: TARGET_URL + '/backend/connect'
    }, {source: '/backend/saywelcome', target: TARGET_URL + '/backend/saywelcome'}
      , {source: '/backend/say', target: TARGET_URL + '/backend/say'}, {
        source: '/backend/listen',
        target: TARGET_URL + '/backend/listen'
      }, {source: '/backend/changestate', target: TARGET_URL + '/backend/changestate'}]
  }));
});