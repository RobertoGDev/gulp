const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const pump = require("pump");
const uglify = require("gulp-uglify");
const babelMinify = require("gulp-babel-minify");
const htmlreplace = require("gulp-html-replace");
const concat = require("gulp-concat");
const clean = require("gulp-clean");

gulp.task("uno", () => {
  console.log("Tarea uno");
});

gulp.task("html", done => {
  return new Promise((resolve, reject) => {
    return gulp
      .src("./dist/html-temp/index.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("./dist"))
      .on("end", resolve(done));
  });
});

gulp.task("js-minify", done => {
  return new Promise((resolve, reject) => {
    return gulp
      .src("./dist/js/*.js")
      .pipe(
        babelMinify({
          mangle: {
            keepClassName: true
          }
        })
      )
      .pipe(gulp.dest("./dist"))
      .on("end", resolve(done));
  });
});

gulp.task("concat-js", function(done) {
  return new Promise((resolve, reject) => {
    return gulp
      .src("./js/*.js")
      .pipe(concat("bundle.js"))
      .pipe(gulp.dest("./dist/js/"))
      .on("end", () => resolve(done));
  });
});

gulp.task("babel", done => {
  return new Promise(resolve => {
    return gulp
      .src("./dist/js/**/*.js")
      .pipe(
        babel({
          presets: ["@babel/env"]
        })
      )
      .pipe(gulp.dest("dist/js/"))
      .on("end", () => resolve(done));
  });
});

gulp.task("html-replace", function(done) {
  return new Promise((resolve, reject) => {
    return gulp
      .src("index.html")
      .pipe(
        htmlreplace({
          js: "./bundle.js"
        })
      )
      .pipe(gulp.dest("dist/html-temp"))
      .on("end", () => resolve(done));
  });
});

gulp.task("clear", done => {
  return new Promise((resolve, reject) => {
    return gulp
      .src(["./dist/html-temp", "./dist/js"])
      .pipe(clean())
      .on("end", () => resolve(done));
  });
});

gulp.task(
  "build",
  gulp.series(
    "concat-js",
    "babel",
    "js-minify",
    "html-replace",
    "html",
    "clear"
  ),
  done => done()
);
