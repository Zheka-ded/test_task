var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sassLint = require('gulp-sass-lint');

// server
gulp.task('server', function() {
    connect.server({
      root: 'public',
      livereload: true
    });
  });

// style
gulp.task('styles', function () {
    gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 15 versions']
        }))
      .pipe(gulp.dest('./public/css'))
      .pipe(connect.reload());
});

// html
gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(connect.reload());
});

// watch
gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['styles'])
    gulp.watch('./src/*.html', ['html']);
});

// sassLinter
gulp.task('default', function () {
  return gulp.src('sass/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('default', ['html', 'styles', 'server', 'watch']);