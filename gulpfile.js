var gulp = require('gulp'),
	path = require('path'),
	less = require('gulp-less'),
	watch = require('gulp-watch'),
	minifyCSS = require('gulp-minify-css'),
	zip = require('gulp-zip'),
	clean = require('gulp-clean');

var path = {
	compileDir: "./compile/",
	builtDir: "./built/",
	src: "./src/chrome/",
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

gulp.task('clean-css', function(){
	return 	gulp.src(path.src + "css/**/*.css")
				.pipe(clean())
})

// Uncomment to minify css
gulp.task('less', ['clean-css'], function () {
  	return  gulp.src('./**/*.less')
				.pipe(less())
				// .pipe(minifyCSS())
				.pipe(gulp.dest(path.src+'css'));
});

gulp.task('clean', function () {
  	return  gulp.src(path.compileDir + '*')
				.pipe(clean());
});

gulp.task('copy', ['clean'], function () {
  	return  gulp.src(path.compileFiles, { cwd: path.src })
				.pipe(gulp.dest(path.compileDir));
});

gulp.task('build', ['copy'], function() {
    return  gulp.src(path.compileDir)
		    	.pipe(zip('voz-living.zip'))
		    	.pipe(gulp.dest(path.builtDir));
});

gulp.task('default', ['less'], function(){
	gulp.watch(path.src + 'less/**/*.less', ['less']);
});
