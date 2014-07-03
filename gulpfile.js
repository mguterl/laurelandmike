var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade'),
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
});

gulp.task('default', function() {
  gulp.start('templates', 'stylesheets');
});
