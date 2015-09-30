var gulp = require('gulp');
var jade = require('gulp-jade');
require('harmonize')();

var react = require('gulp-react');
var watchfiles = 'client/*.jade';
var browserify = require('gulp-browserify'),
  jest = require('gulp-jest');
var webrootdir = 'www';
var htmlfiles = 'client/**/*.html';
var cssfiles = 'client/css/**/*.css';
var jsfiles = 'client/js/**/*.js';
var jsxfiles = 'client/js/**/*.jsx';

var mainjsfile = 'client/js/app.js';
var reactify = require('reactify');

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
  return gulp.src(mainjsfile)
    .pipe(browserify({transform: reactify, debug: true}))
    .pipe(gulp.dest(webrootdir + '/js'));
});


gulp.task('copycss', function () {
  return gulp.src(cssfiles).
    pipe(gulp.dest(webrootdir + '/css'));

});

gulp.task('test', function () {
  return gulp.src('client/tests')
    .pipe(jest({
      scriptPreprocessor: 'preprocessor.js',
      testDirectoryName: 'spec',
      modulePathIgnorePatterns: [],
      unmockedModulePathPatterns: ["react", "jquery", "components", "services", '../../node_modules', 'ReactUpdates'],
      moduleFileExtensions: ['js', 'jsx', 'json', 'react']
    }));

});

gulp.task('default', ['copyhtml', 'copycss', 'compilejs'], function () {

  gulp.watch(htmlfiles, ['copyhtml']);
  gulp.watch(cssfiles, ['copycss']);
  gulp.watch([jsfiles, jsxfiles], ['compilejs']);

  gulp.src(webrootdir).pipe(webserver({
    livereload: true,
    open: 'http://0.0.0.0:9001/index.html',
    port: 9001,
    host: '0.0.0.0',
    proxies: [{
      source: '/backend/connect',
      target: 'http://localhost:8880/backend/connect'
    }, {source: '/backend/say', target: 'http://localhost:8880/backend/say'}, {
      source: '/backend/listen',
      target: 'http://localhost:8880/backend/listen'
    },{source: '/backend/changestate', target: 'http://localhost:8880/backend/changestate'}]
  }));
});