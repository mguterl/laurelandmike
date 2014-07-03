var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade');

gulp.task('templates', function() {
  gulp.src('./templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'));
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
});

gulp.task('default', function() {
  gulp.start('templates');
});
