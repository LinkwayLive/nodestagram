import mocha from 'gulp-mocha';
import gulp from 'gulp';
import { log } from 'gulp-util';
import PrettyError from 'pretty-error';
import config from './../configs/config';

const pe = new PrettyError();

gulp.task('integration-test', function serverIntegrationTest() {
  return gulp.src(config.test.integration.src, {
    read: false
  }).pipe(mocha())
    .once('error', function handleError(err) {
      log(pe.render(err));
      process.exit(1);
    });
});
