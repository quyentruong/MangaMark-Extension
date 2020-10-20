'use strict';

//npm install --save-dev gulp gulp-clean-css gulp-terser gulp-clean gulp-cleanhtml jshint gulp-jshint gulp-strip-debug gulp-zip

const gulp = require('gulp'),
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

gulp.task('copy_vendor', function () {
    return gulp.src('src/vendor/*.js')
        .pipe(gulp.dest('build/vendor'));
});

gulp.task('manifest_firefox', function () {
    gulp.src('src/vendor/empty.jjs')
        .pipe(rename("browser-polyfill.min.js"))
        .pipe(gulp.dest('build/vendor'));
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

const manifest_chrome = require('./src/manifest-chrome'),
    distFileName_chrome = manifest_chrome.name + ' v' + manifest_chrome.version + '.crx';

gulp.task('pack', shell.task(`chrome.exe --pack-extension=${__dirname}/build --pack-extension-key=${__dirname}/MangaMark.pem`));
//build ditributable and sourcemaps after other tasks completed
gulp.task('chrome_zip', gulp.series('html', 'scripts', 'styles', 'copy', 'copy_vendor', 'manifest_chrome', 'pack', () => {

    // mapFileName = manifest.name + ' v' + manifest.version + '-maps.zip';
//collect all source maps
//     gulp.src('build/scripts//*.map')
//         .pipe(zip(mapFileName))
//         .pipe(gulp.dest('dist'));
//build distributable extension
    return gulp.src('build.crx').pipe(rename(distFileName_chrome)).pipe(gulp.dest('dist'));
//     return gulp.src(['build/**'])
//         .pipe(zip(distFileName))
//         .pipe(gulp.dest('dist'));
}));

const manifest_firefox = require('./src/manifest-firefox'),
    distFileName_firefox = manifest_firefox.name + ' v' + manifest_firefox.version + '.xpi';
// gulp.task('firefox_nopoly',)
gulp.task('pack_firefox', shell.task(`web-ext.cmd sign --source-dir="build" --filename="dist/${distFileName_firefox}" --api-key="user:9343990:178" --api-secret="13851ef94affe9d285510dfb0a82208709724f5ad2298322df42b1dc74137881"`));
gulp.task('firefox_zip', gulp.series('html', 'scripts', 'styles', 'copy', 'manifest_firefox', 'pack_firefox'));

// gulp.task('firefox', gulp.series('clean', 'firefox_zip'));
gulp.task('firefox_nosign', gulp.series('clean', 'html', 'scripts', 'styles', 'copy', 'manifest_firefox', () => {
    return gulp.src(['build/**'])
        .pipe(zip(distFileName_firefox))
        .pipe(gulp.dest('dist'));
}));

//run all tasks after build directory has been cleaned
gulp.task('chrome', gulp.series('clean', 'chrome_zip', 'clean3'));
gulp.task('chrome_nosign', gulp.series('clean', 'html', 'scripts', 'styles', 'copy', 'copy_vendor', 'manifest_chrome', () => {
    return gulp.src(['build/**'])
        .pipe(zip(distFileName_chrome))
        .pipe(gulp.dest('dist'));
}));