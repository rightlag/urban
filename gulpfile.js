(function () {
  'use strict';
  var gulp = require('gulp');
  var browserSync = require('browser-sync');
  var Server = require('karma').Server;
  gulp.task('serve', function() {
    browserSync({
      server: {
        baseDir: './app',
        routes: {
          '/node_modules': './node_modules',
          '/content': './content'
        }
      }
    });
    gulp.watch(['*.html', '**/*.js', '../content/**/*.css'], { cwd: './app' }, browserSync.reload);
  });
  gulp.task('test', function(done) {
    new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true,
    }, done).start();
  });
}());
