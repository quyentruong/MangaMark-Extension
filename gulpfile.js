'use strict';

//npm install --save-dev gulp gulp-clean-css gulp-terser gulp-clean gulp-cleanhtml jshint gulp-jshint gulp-strip-debug gulp-zip

var gulp = require('gulp'),
    clean = require('gulp-clean'),
    cleanhtml = require('gulp-cleanhtml'),
    minifycss = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-terser'),
    rename = require("gulp-rename"),
    shell = require('gulp-shell'),
    zip = require('gulp-zip');

//clean build directory
gulp.task('clean', function () {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
});

gulp.task('clean2', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
});

gulp.task('clean3', function () {
    return gulp.src('build.crx', {read: false})
        .pipe(clean());
});

//copy static folders to build directory
gulp.task('copy', function () {
    // gulp.src('src/fonts/')
    //     .pipe(gulp.dest('build/fonts'));
    return gulp.src('src/icons/*.png')
        .pipe(gulp.dest('build/icons'));
    // gulp.src('src/_locales/**')
    //     .pipe(gulp.dest('build/_locales'));
    // return gulp.src('src/manifest-firefox.json')
    //     .pipe(rename("manifest.json"))
    //     .pipe(gulp.dest('build'));
});

gulp.task('manifest_firefox', function () {
    return gulp.src('src/manifest-firefox.json')
        .pipe(rename("manifest.json"))
        .pipe(gulp.dest('build'));
});

gulp.task('manifest_chrome', function () {
    return gulp.src('src/manifest-chrome.json')
        .pipe(rename("manifest.json"))
        .pipe(gulp.dest('build'));
});

//copy and compress HTML files
gulp.task('html', function () {
    return gulp.src('src/html/*.html')
        .pipe(cleanhtml())
        .pipe(gulp.dest('build/html'));
});

//run scripts through JSHint
gulp.task('jshint', function () {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//copy vendor scripts and uglify all other scripts, creating source maps
gulp.task('scripts', gulp.series('jshint', function () {
    gulp.src('src/vendor/*.js')
        .pipe(gulp.dest('build/vendor'));
    return gulp.src(['src/js/*.js'])
        .pipe(stripdebug())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
}));

//minify styles
gulp.task('styles', function () {
// return gulp.src('src/styles//*.css')
// .pipe(minifycss({root: 'src/styles', keepSpecialComments: 0}))
// .pipe(gulp.dest('build/styles'));
    return gulp.src('src/css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});
gulp.task('pack', shell.task(`chrome.exe --pack-extension=${__dirname}/build --pack-extension-key=${__dirname}/MangaMark.pem`));
//build ditributable and sourcemaps after other tasks completed
gulp.task('chrome_zip', gulp.series('html', 'scripts', 'styles', 'copy', 'manifest_chrome', 'pack', () => {
    const manifest = require('./src/manifest-chrome'),
        distFileName = manifest.name + ' v' + manifest.version + '.crx';
    // mapFileName = manifest.name + ' v' + manifest.version + '-maps.zip';
//collect all source maps
//     gulp.src('build/scripts//*.map')
//         .pipe(zip(mapFileName))
//         .pipe(gulp.dest('dist'));
//build distributable extension
    return gulp.src('build.crx').pipe(rename(distFileName)).pipe(gulp.dest('dist'));
//     return gulp.src(['build/**'])
//         .pipe(zip(distFileName))
//         .pipe(gulp.dest('dist'));
}));

const manifest = require('./src/manifest-firefox'),
    distFileName = manifest.name + ' v' + manifest.version + '.xpi';
gulp.task('pack_firefox', shell.task(`web-ext.cmd sign --source-dir="build" --filename="dist/${distFileName}" --api-key="user:9343990:178" --api-secret="13851ef94affe9d285510dfb0a82208709724f5ad2298322df42b1dc74137881"`))
gulp.task('firefox_zip', gulp.series('html', 'scripts', 'styles', 'copy', 'manifest_firefox', 'pack_firefox'))

gulp.task('firefox', gulp.series('clean', 'firefox_zip'));

//run all tasks after build directory has been cleaned
gulp.task('chrome', gulp.series('clean', 'chrome_zip', 'clean3'));
