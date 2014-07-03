var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rimraf = require('gulp-rimraf'),
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
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/javascripts'));
});

gulp.task('images', function() {
  gulp.src('./images/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('clean', function() {
  gulp.src('./dist', { read: false })
    .pipe(rimraf())
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
  gulp.watch('images/**', ['images']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('templates', 'stylesheets', 'javascripts', 'images');
});
