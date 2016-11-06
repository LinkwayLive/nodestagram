import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('test', function test(callback) {
  runSequence(
    'js-lint-src',
    'js-lint-test',
    'js-lint-gulp',
    'unit-test',
    // 'integration-test',
    callback
  );
});
