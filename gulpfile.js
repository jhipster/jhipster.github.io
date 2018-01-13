var gulp = require("gulp"),
    browserSync = require('browser-sync').create(),
    sass = require("gulp-sass"),
    imagemin = require('gulp-imagemin');

gulp.task('images', ['min-img', 'min-images', 'min-company-logo'])

gulp.task('min-img', function () {
    return gulp.src('images/logo/**/*.{png,gif,jpg,jpeg}')
        .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
        .pipe(gulp.dest('images/logo/'));
});
gulp.task('min-images', function () {
    return gulp.src('images/*.{png,gif,jpg,jpeg}')
        .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
        .pipe(gulp.dest('images/'));
});
gulp.task('min-company-logo', function () {
    return gulp.src('companies-using-jhipster/images/*.{png,gif,jpg,jpeg}')
        .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
        .pipe(gulp.dest('companies-using-jhipster/images'));
});

gulp.task("sass", function() {
  return gulp.src('./css/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

gulp.task("watch", function() {
  gulp.watch('./css/**/*.scss',['sass']);
  gulp.watch(['./js/**/*.js', './**/*.html', './**/*.md']).on('change', browserSync.reload);
});

gulp.task('init-server', function() {
    browserSync.init({
        server: {
            baseDir: "./_site"
        }
    });
});

gulp.task('dev', ['sass','watch','init-server']);

gulp.task('default', ['dev']);
