/* eslint-disable node/no-unpublished-require */
const postcss = require("gulp-postcss");
const gulp = require("gulp");
const autoPrefixer = require("autoprefixer");
const cssNano = require("cssnano");
const cssImports = require("postcss-import");
const del = require("del");
const uglify = require("gulp-uglify-es").default;
const htmlmin = require("gulp-htmlmin");
const sourcemaps = require("gulp-sourcemaps");
const favicons = require("favicons").stream;
const fs = require("fs");

gulp.task("css", async () => {
  const plugins = [
    autoPrefixer(),
    cssImports(),
    cssNano(),
  ];
  return gulp
    .src("./static/assets/css/*.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./public/assets/css"));
});

gulp.task("scripts", async () => {
  return gulp
    .src(["./**/*.js", "!gulpfile.js", "!./node_modules/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./public/js"));
});

gulp.task("pages", async () => {
  return gulp
    .src(["./static/**/*.html"])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest("./public"));
});

gulp.task("clean", () => del(["public"]));

gulp.task(
  "default",
  gulp.series("clean", gulp.parallel("css", "scripts", "pages"))
);

gulp.task("favicons", async () => {
  return gulp
    .src("favicon.png")
    .pipe(
      favicons({
        appName: "CISSA",
        appShortName: null,
        appDescription: "CISSA",
        developerName: null,
        developerURL: null,
        background: "#fff",
        path: "favicons/",
        url: "https://cissa.org.au/",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/?homescreen=1",
        version: 1.0,
        logging: false,
        html: "index.html",
        pipeHTML: true,
        replace: true,
      })
    )
    .on("error", log)
    .pipe(gulp.dest("./"));
});
