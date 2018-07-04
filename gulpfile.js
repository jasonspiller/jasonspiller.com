var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

// processes sass files
gulp.task('css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write('.maps'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
});

// processes images
gulp.task('images', function() {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('img'))
});

// copy task to copy any other files
gulp.task('copy', function() {
  return gulp.src('src/**/*.+(html|htm|js)')
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
});

// initiate BrowserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  })
});

// watch task to monitor files
gulp.task('watch', ['browserSync', 'css', 'images'], function() {
  gulp.watch('src/scss/**/*.scss', ['css'])
  gulp.watch('src/**/*.+(jpg|png|gif|svg)', ['images'])
  gulp.watch('src/**/*.+(html|htm|js)', ['copy'])
});
