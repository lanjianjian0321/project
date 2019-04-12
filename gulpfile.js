const gulp = require("gulp");

const webserver = require("gulp-webserver");
//css
const gulpsass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-clean-css");
//js
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
//html
const htmlmin = require("gulp-htmlmin");


//编译scss

gulp.task("scss", () => {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(gulpsass())
        .pipe(gulp.dest("./bulid/css"))
})

//编译es5

gulp.task("devbabel", () => {
    return gulp.src("./src/js/**/*.js")
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(gulp.dest("./bulid/js"))
})

gulp.task("devhtml", () => {
    return gulp.src("./src/**/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest("./bulid"))
})
gulp.task("watching", () => {
    return gulp.watch(["./src/scss/**/*.scss", "./src/js/**/*.js", "./src/**/*.html"], gulp.series("scss", "devbabel", "devhtml"))
})

gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webserver({
            port: 9999,
            livereload: true,
            open: true,
        }))
})


gulp.task("default", gulp.series("scss", "devbabel", "server", "watching"))