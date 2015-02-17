var gulp = require("gulp"),
	sass = require("gulp-sass"),
	connect = require("gulp-connect");

var handleErrors = function () {
	console.error(arguments);
};

gulp.task("sass", function() {
	return gulp.src("src/styles/*.scss")
		.pipe(sass())
		.on("error", handleErrors)
		.pipe(gulp.dest("./app/styles/"));
});

gulp.task("copy", function() {
	return gulp.src("src/html/*.html")
  		.pipe(gulp.dest("./app"));
});

gulp.task("server", function() {
  connect.server({
    livereload: true,
    root: ["./app"],
    port: 1337
  });
});

gulp.task("watch", function() {
    gulp.watch("src/styles/*.scss", ["sass"]);
    gulp.watch("src/html/*.html", ["copy"]);
});

gulp.task("default", ["sass", "copy", "server", "watch"]);