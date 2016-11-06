import mocha from 'gulp-mocha';
import gulp from 'gulp';
import config from './../configs/config';

gulp.task('unit-test', function serverUnitTest() {
  return gulp.src(config.test.unit.src, {
    read: false
  }).pipe(mocha());
});
