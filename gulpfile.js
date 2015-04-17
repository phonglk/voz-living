var gulp = require('gulp'),
	path = require('path'),
	less = require('gulp-less'),
	watch = require('gulp-watch'),
	minifyCSS = require('gulp-minify-css'),
	zip = require('gulp-zip'),
	clean = require('gulp-clean');
var bower = require('gulp-bower');
var runSequence = require('run-sequence');

var path = {
	compileDir: "./compile/",
	builtDir: "./built/",
	src: "./src/",
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
};
path.chromeCompileDir = path.compileDir + 'chrome/';
path.commonSrc = path.src + 'common/';
path.chromeSrc = path.src + 'chrome/';

gulp.task('clean-css', function(){
	return 	gulp.src(path.src + "css/**/*.css", {read: false})
				.pipe(clean());
});

// Uncomment to minify css
gulp.task('less', ['clean-css'], function () {
  	return  gulp.src('./less/**/*.less' , {cwd: path.src})
				.pipe(less())
				// .pipe(minifyCSS())
				.pipe(gulp.dest(path.src+'css'));
});

gulp.task('clean', function () {
  	return  gulp.src(path.compileDir + '*', {read: false})
				.pipe(clean());
});

gulp.task('copy', ['clean'], function () {
  	return  gulp.src(path.compileFiles, { cwd: path.src })
				.pipe(gulp.dest(path.compileDir));
});

gulp.task('less-common', function () {
	return  gulp.src('./less/**/*.less' , {cwd: path.commonSrc})
			.pipe(less())
			.pipe(minifyCSS())
			.pipe(gulp.dest(path.commonSrc + 'css'));
});

gulp.task('less-chrome', function () {
	return  gulp.src('./less/**/*.less' , {cwd: path.chromeSrc})
			.pipe(less())
			.pipe(minifyCSS())
			.pipe(gulp.dest(path.chromeSrc + 'css'));
});

gulp.task('compile-crx-clean', function () {
	return gulp.src([
					path.chromeCompileDir + '*',
					'!' + path.chromeCompileDir + 'bower_components/'
				], { read: false })
				.pipe(clean());
});

gulp.task('compile-crx-copy-common', ['less-common'], function () {
	return gulp.src([
					'./common/**/*',
				], { cwd: path.src })
				.pipe(gulp.dest(path.chromeCompileDir+'/common'));
});

gulp.task('compile-crx-copy-assert', ['compile-crx-copy-common', 'less-chrome'], function () {
	return gulp.src([
					path.src + 'chrome/**/*',
					'./bower.json'
				])
				.pipe(gulp.dest(path.chromeCompileDir));
});

gulp.task('compile-crx', ['compile-crx-copy-assert'], function () {
	runSequence('compile-crx-clean',
				'compile-crx-copy-assert', function(){
					bower({cwd: path.chromeCompileDir});
				});
});

gulp.task('watch-chrome', function(){
	gulp.watch(path.chromeSrc + '/**/*', {readDelay: 500}, ['compile-crx-copy-assert']);
});

gulp.task('build-crx', function() {
    return  gulp.src([
					'./**/*',
				], {cwd: path.chromeCompileDir})
		    	.pipe(zip('voz-living.crx.zip'))
		    	.pipe(gulp.dest(path.builtDir));
});

gulp.task('build-crx-stand-alone', ['compile-crx'], function() {
    runSequence('build-crx');
});

gulp.task('default', ['less'], function(){
	gulp.watch(path.src + 'less/**/*.less', ['less']);
});
