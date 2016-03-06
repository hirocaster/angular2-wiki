var del = require('del');
var gulp = require('gulp');
var webserver = require('gulp-webserver');

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

gulp.task('server', function () {
  gulp.src('dist')
    .pipe(webserver({
      host: 'localhost',
      port: 9000,
      livereload: true,
      fallback: 'index.html',
      proxies: [
        {
          source: '/api',
          target: 'http://localhost:3000'
        }
      ]
    }));
});

gulp.task('default', ['server', 'ts', 'html', 'css', 'libs', 'watch']);
