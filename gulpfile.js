(function () {
  'use strict';
  var gulp = require('gulp');
  var browserSync = require('browser-sync');
  gulp.task('serve', function() {
    browserSync({
      server: {
        baseDir: './app',
        routes: {
          '/bower_components': './bower_components'
        }
      }
    });
    gulp.watch(['*.html', '**/*.js'], { cwd: './app' }, browserSync.reload);
  });
}());
