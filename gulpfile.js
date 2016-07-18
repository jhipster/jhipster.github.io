var gulp = require("gulp"),
    coffee = require("gulp-coffee"),
    browserSync = require('browser-sync').create(),
    sass = require("gulp-sass"),
    mainBowerFiles = require('main-bower-files'),
    replace = require('gulp-replace'),
    rimraf = require('rimraf'),
    imagemin = require('gulp-imagemin'),
    rename = require("gulp-rename");

gulp.task('build', function(cb) {

    // lib
    lib = mainBowerFiles()
    js_lib = []
    css_lib = []
    fonts_lib = []
    acejs_lib = []
    for(var i = 0; i < lib.length; i++) {
      if(lib[i].indexOf('.js') > -1) {
        if(lib[i].indexOf('/ace-builds/') > -1) {
          acejs_lib.push(lib[i])
        } else {
          js_lib.push(lib[i])
        }
      } else if(lib[i].indexOf('.css') > -1) {
        css_lib.push(lib[i])
      } else if(lib[i].indexOf('/fonts/') > -1) {
        fonts_lib.push(lib[i])
      }
    }

    gulp.src("./js/**/*.js").pipe(gulp.dest('./dist/js'));
    gulp.src("./css/**/*.css").pipe(gulp.dest('./dist/css'));
    gulp.src("./img/**/*").pipe(gulp.dest('./dist/img'));

    gulp.src(js_lib).pipe(gulp.dest('./dist/lib/js'));
    gulp.src(acejs_lib).pipe(gulp.dest('./dist/lib/js/ace'));
    gulp.src(css_lib).pipe(gulp.dest('./dist/lib/css'));
    gulp.src(fonts_lib).pipe(gulp.dest('./dist/lib/fonts'));
    gulp.src("./dist/lib/css/_all.css").pipe(gulp.dest("./"));
});

gulp.task('images', ['min-img', 'min-images', 'min-company-logo'])

gulp.task('min-img', function () {
    return gulp.src('img/**/*.{png,gif,jpg,jpeg}')
        .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
        .pipe(gulp.dest('img/'));
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
});

gulp.task('init-server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('dev', ['sass','watch','init-server']);
