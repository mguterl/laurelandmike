var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');

gulp.task('templates', function() {
  gulp.src('./templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('stylesheets', function() {
  gulp.src('./stylesheets/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('javascripts', function() {
  gulp.src('./javascripts/*.js')
    .pipe(concat('application.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', function(next) {
  var connect = require('connect'),
      server = connect();
  server.use(connect.static('dist')).listen(process.env.PORT || 8000, next);
});

gulp.task('watch', ['server'], function() {
  livereload.listen();

  gulp.watch(['dist/**']).on('change', livereload.changed)
  gulp.watch('templates/**/*.jade', ['templates']);
  gulp.watch('stylesheets/**/*.scss', ['stylesheets']);
  gulp.watch('javascripts/**/*.js', ['javascripts']);
});

gulp.task('default', function() {
  gulp.start('templates', 'stylesheets', 'javascripts');
});
