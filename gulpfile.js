var gulp = require('gulp'),
	path = require('path'),
	less = require('gulp-less'),
	watch = require('gulp-watch'),
	minifyCSS = require('gulp-minify-css'),
	zip = require('gulp-zip'),
	clean = require('gulp-clean');

var path = {
	compileDir: "./compile/",
	builtDir: "./built",
	compileFiles: [
		"./html/**/*.html",
		"./js/**/*.js",
		"./css/**/*.css",
		"./manifest.json",
		"./icos/**/*.png",
		"./bower_components/**/*",
		"./themes/**/*",
		"./audios/**/*"
	]
}

// Uncomment to minify css
gulp.task('less', function () {
  	return  gulp.src('./less/**/*.less')
				.pipe(watch('./less/**/*.less'))
				.pipe(less())
				// .pipe(minifyCSS()) 
				.pipe(gulp.dest('./css'));
});

gulp.task('clean', function () {
  	return  gulp.src(path.compileDir + '*')
				.pipe(clean());
});

gulp.task('copy', ['clean'], function () {
  	return  gulp.src(path.compileFiles, { base: "." })
				.pipe(gulp.dest(path.compileDir));
});

gulp.task('build', ['copy'], function() {
    return  gulp.src(path.compileDir)
		    	.pipe(zip('voz-living.zip'))
		    	.pipe(gulp.dest(path.builtDir));
});

gulp.task('default', ['less'])