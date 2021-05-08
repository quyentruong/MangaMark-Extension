'use strict';

//npm install --save-dev gulp gulp-clean-css gulp-terser gulp-clean gulp-cleanhtml jshint gulp-jshint gulp-strip-debug gulp-zip
// npm install -g github-release-cli
// npm install -g @babel/runtime
const gulp = require('gulp'),
    clean = require('gulp-clean'),
    cleanhtml = require('gulp-cleanhtml'),
    minifycss = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-terser'),
    rename = require("gulp-rename"),
    shell = require('gulp-shell'),
    zip = require('gulp-zip'),
    dotenv = require('dotenv'),
    execa = require('execa'),
    // need these to build xml file
    builder = require('xmlbuilder'),
    fs = require('fs');

// load environment variables
const result = dotenv.config();

if (result.error) {
    throw result.error;
}

// print output of commands into the terminal
const stdio = 'inherit';

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
    return gulp.src(['src/vendor/*.js', 'src/vendor/*.css'])
        .pipe(gulp.dest('build/vendor'));
});

gulp.task('manifest_firefox', function () {
    gulp.src('src/vendor/empty.jjs')
        .pipe(rename("browser-polyfill.min.js"))
        .pipe(gulp.dest('build/vendor'));
    gulp.src(['src/vendor/sweetalert.min.js', 'src/vendor/js-snackbar.min.js', 'src/vendor/js-snackbar.min.css'])
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
    distFileName_chrome = manifest_chrome.name + '.crx';
// distFileName_chrome = manifest_chrome.name + ' v' + manifest_chrome.version + '.crx';

// Create update XML file for chrome extension
async function createUpdateXML() {
    const doc = builder.create('gupdate', {encoding: 'UTF-8'})
        .att('xmlns', 'http://www.google.com/update2/response',)
        .att('protocol', '2.0')
        .ele('app')
        .att('appid', 'fdmcgbkgpjiggcfpoehpfkiapofheada')
        .ele('updatecheck')
        .att('codebase', 'https://github.com/quyentruong/MangaMark-Extension/releases/latest/download/Manga.Mark.crx')
        .att('version', manifest_chrome.version)
        .up()
        .up();

    const xml = doc.end({pretty: true});
    fs.writeFile('updates.xml', xml, function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

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
    distFileName_firefox = manifest_firefox.name + ' v' + manifest_firefox.version + '.xpi',
    distFileName_firefox_src = manifest_firefox.name + ' v' + manifest_firefox.version + '_src.zip';
// gulp.task('firefox_nopoly',)
gulp.task('pack_firefox', shell.task(`web-ext.cmd sign --source-dir="build" --filename="dist/${distFileName_firefox}" --api-key="user:9343990:178" --api-secret="13851ef94affe9d285510dfb0a82208709724f5ad2298322df42b1dc74137881"`));
gulp.task('firefox_zip', gulp.series('html', 'scripts', 'styles', 'copy', 'manifest_firefox', 'pack_firefox'));

// gulp.task('firefox', gulp.series('clean', 'firefox_zip'));


//run all tasks after build directory has been cleaned
gulp.task('chrome', gulp.series('clean', 'chrome_zip', 'clean3'));


gulp.task('firefox_nosign', gulp.series('clean', 'html', 'scripts', 'styles', 'copy', 'manifest_firefox', () => {
    return gulp.src(['build/**'])
        .pipe(zip(distFileName_firefox))
        .pipe(gulp.dest('dist'));
}));

gulp.task('chrome_nosign', gulp.series('clean', 'html', 'scripts', 'styles', 'copy', 'copy_vendor', 'manifest_chrome', () => {
    return gulp.src(['build/**'])
        .pipe(zip(distFileName_chrome))
        .pipe(gulp.dest('dist'));
}));

gulp.task('firefox_src', () => {
    return gulp.src(['src/**',
        'README.md',
        'build/**',
        'build/manifest.json',
        '!build/css/**',
        '!build/js/**',
        '!build/icons/**',
        '!build/html/**',
        '!src/manifest*',
        '!src/hot-reload.js',
        '!src/gitignore',
        '!src/vendor/**'])
        .pipe(zip(distFileName_firefox_src))
        .pipe(gulp.dest('dist'));
});

gulp.task('chrome_after_build', gulp.series('copy_vendor', 'manifest_chrome', 'pack', () => {
    return gulp.src('build.crx')
        .pipe(rename(distFileName_chrome))
        .pipe(gulp.dest('dist'));
}));

async function uploadRelease() {
    await execa('github-release',
        ['upload',
            '--token', process.env.GH_TOKEN,
            '--owner', 'quyentruong',
            '--repo', 'MangaMark-Extension',
            '--tag', manifest_chrome.version,
            '--release-name', manifest_chrome.version,
            '--prerelease', false,
            'dist/Manga Mark.crx'], {stdio});
}

async function deleteRelease() {
    await execa('github-release',
        ['delete',
            '--token', process.env.GH_TOKEN,
            '--owner', 'quyentruong',
            '--repo', 'MangaMark-Extension',
            '--tag', manifest_chrome.version,
        ], {stdio});
}

// github-release upload `
//   --token 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 `
// --owner quyentruong `
//   --repo testgulprelease `
// --tag "v0.1.0" `
//   --release-name "v0.1.0" `
// --body "This release contains bug fixes and imporvements, including:`n..." `
//   --prerelease=false `
// package.json

gulp.task('deploy', gulp.series('clean2', 'firefox_nosign', 'firefox_src', 'chrome_after_build', createUpdateXML));
gulp.task('release', gulp.series(uploadRelease));
gulp.task('delete_release', gulp.series(deleteRelease));
