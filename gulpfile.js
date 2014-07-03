var gulp = require('gulp');

var jade = require('gulp-jade');

gulp.task('templates', function() {
  gulp.src('./templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch('templates/**/*.jade', ['templates']);
});

gulp.task('default', function() {
  gulp.start('templates');
});
