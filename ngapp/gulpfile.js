var del = require('del');
var gulp = require('gulp');
var connect = require('gulp-connect');
var modRewrite = require('connect-modrewrite');
var proxy = require('proxy-middleware');
var url = require('url');
var ts = require('gulp-typescript');

tsProject = ts.createProject('tsconfig.json', function() {
  typescript: require('typescript')
});

gulp.task('ts', function() {
  tsProject.src('src/*.ts')
    .pipe(ts(tsProject))
    // .pipe(babel())
    // .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('dist'));
});

gulp.task('libs', function () {
  return gulp.src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
      'node_modules/angular2/bundles/http.dev.js'
          ])
      .pipe(gulp.dest('dist/app/lib'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.ts', ['ts']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
});


gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('proxy', function() {
  connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true,

    // /apiにきたリクエストは http://localhost:3000/api にプロキシする。
    middleware: function(connect, o) {
      return [ (function() {
        var options = url.parse('http://localhost:3000/');
        options.route = '/api';
        return proxy(options);
      })(),

    // URLを指定してアクセスがきたらindex.htmlに渡してangular2に処理させる
    (function() {
      return modRewrite([
        '!\\.\\w+$ /index.html [L]'
      ]);
    })()];
    }
  });
});

gulp.task('default', ['proxy', 'ts', 'html', 'css', 'libs', 'watch']);
