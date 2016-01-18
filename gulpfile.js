var gulp = require("gulp"),
    coffee = require("gulp-coffee"),
    browserSync = require('browser-sync').create(),
    sass = require("gulp-sass"),
    mainBowerFiles = require('main-bower-files'),
    replace = require('gulp-replace'),
    rimraf = require('rimraf'),
    rename = require("gulp-rename");

gulp.task('build', function(cb) {
    // HTML
    gulp.src('index.html')
      .pipe(replace('bower_components/bootstrap/dist/css/bootstrap.min.css', 'lib/css/bootstrap.min.css'))
      .pipe(replace('bower_components/font-awesome/css/font-awesome.min.css', 'lib/css/font-awesome.min.css'))
      .pipe(replace('bower_components/animate.css/animate.min.css', 'lib/css/animate.min.css'))
      .pipe(replace('bower_components/datatables/media/css/jquery.dataTables.min.css', 'lib/css/jquery.dataTables.min.css'))
      .pipe(replace('bower_components/datatables/media/css/dataTables.bootstrap.css', 'lib/css/dataTables.bootstrap.css'))
      .pipe(replace('bower_components/jquery/dist/jquery.min.js', 'lib/js/jquery.min.js'))
      .pipe(replace('bower_components/bootstrap/dist/js/bootstrap.min.js', 'lib/js/bootstrap.min.js'))
      .pipe(replace('bower_components/Chart.js/Chart.min.js', 'lib/js/Chart.min.js'))
      .pipe(replace('bower_components/datatables/media/js/jquery.dataTables.min.js', 'lib/js/jquery.dataTables.min.js'))
      .pipe(replace('bower_components/datatables/media/js/dataTables.bootstrap.min.js', 'lib/js/dataTables.bootstrap.min.js'))
      .pipe(replace('bower_components/ace-builds/src/ace.js', 'lib/js/ace/ace.js'))
      .pipe(replace('bower_components/ace-builds/src/mode-html.js', 'lib/js/ace/mode-html.js'))
      .pipe(replace('bower_components/ace-builds/src/theme-github.js', 'lib/js/ace/theme-github.js'))
      .pipe(replace('bower_components/jquery.easing/js/jquery.easing.min.js', 'lib/js/jquery.easing.min.js'))
      .pipe(replace('bower_components/angular/angular.min.js', 'lib/js/angular.min.js'))
      .pipe(gulp.dest('./'));

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
