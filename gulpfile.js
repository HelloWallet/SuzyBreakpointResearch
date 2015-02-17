var gulp = require("gulp"),
	//sass = require("gulp-sass"),
	sass = require('gulp-ruby-sass'),
	connect = require("gulp-connect");

var handleErrors = function () {
	console.error(arguments);
};

gulp.task("sass", function() {
	return sass("src/styles/app.scss",
		{
			require: ["susy", "breakpoint"],
			style: "normal"
		})
		.on("error", handleErrors)
		.pipe(gulp.dest("app/styles"));
});

gulp.task("copy-html", function() {
	return gulp.src("src/html/*.html")
  		.pipe(gulp.dest("./app"));
});

gulp.task("copy-css", function() {
	return gulp.src("bower_components/**/*.css")
  		.pipe(gulp.dest("./app/styles"));
});

gulp.task("server", function() {
	connect.server({
		//livereload: true,
		root: ["./app"],
		port: 1337
	});
});

gulp.task("watch", function() {
	gulp.watch("src/styles/*.scss", ["sass"]);
	gulp.watch("src/html/*.html", ["copy-html"]);
});

gulp.task("default", ["sass", "copy-html", "copy-css", "server", "watch"]);