const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const babel = require('gulp-babel');


gulp.task('default', ['watch']);

gulp.task("build", () => {
    gulp.src("src/index.html")
    .pipe(gulp.dest("dist/"))

    gulp.src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js/"))

    gulp.src("src/css/*")
    .pipe(gulp.dest("dist/css/"))

    gulp.src("src/img/*")
    .pipe(gulp.dest("dist/img/"))

    gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts/'))
});


gulp.task("babel", () => {
    gulp.src("src/js/main.min.js")
    .pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(gulp.dest('dist/ES5'))
});


gulp.task("imagemin", () => {
    gulp.src("src/img/*")
    .pipe(cache(imagemin([
        pngquant({quality: [0.5, 0.5]})
      ])))
    .pipe(gulp.dest("src/img"))
});


gulp.task("sass", function() {
    gulp.src("src/scss/**/*.scss")
    .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }))
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({
        stream: true
    }))
});


gulp.task("watch", ["browserSync", "sass", "scripts", "cleanCss"], function() {
   gulp.watch("src/scss/**/*.scss", ["sass"]); 
   gulp.watch("src/*.html", browserSync.reload);
   gulp.watch("src/js/**/*.js", ["scripts"]);
   gulp.watch("src/css/**/*.css", ["cleanCss"]); 
});



gulp.task("browserSync", function() {
    browserSync({
        server: {
            baseDir: "src"
        },
        notify: false
    })
});



gulp.task("scripts", function(){
    gulp.src("src/js/assets/*.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.reload({
        stream: true
    }))
});



gulp.task("cleanCss", function(){
    gulp.src("src/css/*.css")
    .pipe(cleanCss())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({
        stream: true
    }))
});


