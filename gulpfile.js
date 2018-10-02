const gulp = require('gulp');
const gulpcss = require('gulp-css');
const concat = require('gulp-concat');
const htmlreplace = require("gulp-html-replace");

gulp.task('minicss', done => {
    return new Promise((resolve, rejected) => {
        return gulp
          .src('public/css/**/*.css')
          .pipe(gulpcss())
          .pipe(concat('styles.css'))
          .pipe(gulp.dest('./dist/css'))
          .on("end", () => resolve(done));
    });
});

gulp.task("html-replace", function(done) {
    return new Promise((resolve, reject) => {
      return gulp
        .src("index.html")
        .pipe(
          htmlreplace({
            css: "./dist/css/base.css"
          })
        )
        .pipe(gulp.dest("dist/html_temporal"))
        .on("end", () => resolve(done));
    });
  });

gulp.task('magic', ['minicss', 'html-replace']);