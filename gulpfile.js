var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css');

gulp.task('templates', function() {
  gulp.src('./templates/**/*.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('stylesheets', function() {
  gulp.src('./stylesheets/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('javascripts', function() {
  gulp.src('./javascripts/**/*.js')
    .pipe(gulp.dest('./dist/javascripts'));
});

gulp.task('images', function() {
  gulp.src('./images/*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('clean', function(cb) {
  require('del')(['./dist/*'], cb)
});

gulp.task('server', function(next) {
  var connect = require('connect'),
      server = connect();
  server.use(connect.static('dist')).listen(process.env.PORT || 8000, next);
});

gulp.task('cname', function() {
  require('fs').writeFile('dist/CNAME', 'laurelandmike.com')
});

gulp.task('watch', ['server'], function() {
  livereload.listen();

  gulp.watch('dist/**').on('change', livereload.changed)
  gulp.watch('templates/**/*.html', ['templates']);
  gulp.watch('stylesheets/**/*.css', ['stylesheets']);
  gulp.watch('javascripts/**/*.js', ['javascripts']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('cname', 'templates', 'stylesheets', 'javascripts', 'images');
});
