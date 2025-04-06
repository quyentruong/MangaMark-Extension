import gulp from 'gulp'
import shell from 'gulp-shell'
import rename from 'gulp-rename'
import clean from 'gulp-clean'
import replace from 'gulp-replace'
import jsonEditor from 'gulp-json-editor'
import zip from 'gulp-zip';
import path from 'path'
import fs from 'fs'
import env from '../env.json' assert { type: 'json' }
import packageData from '../package.json' assert { type: 'json' }

export default function firefoxTask(__dirname) {
  async function createUpdateJSON() {
    const jsonString = `{
    "addons": {
      "emptydoremon@gmail.com": {
        "updates": [
          {
            "version": "${packageData.version}",
            "update_link": "https://github.com/quyentruong/MetaComicExtractor/releases/latest/download/MetaComicExtractor.xpi"
          }
        ]
      }
    }
  }`
    const jsonObject = JSON.parse(jsonString)
    const indentedJsonString = JSON.stringify(jsonObject, null, 2)
    fs.writeFileSync('updates_firefox.json', indentedJsonString)
  }

  gulp.task('createUpdateJSON', createUpdateJSON)

  gulp.task('removeUseDynamicUrl', function () {
    return gulp
      .src(['./build_firefox/manifest.json'])
      .pipe(replace(/,\s*"use_dynamic_url": true/g, ''))
      .pipe(gulp.dest('./build_firefox'))
  })

  gulp.task('addBrowserSpecificSettings', function () {
    return gulp
      .src(['./build_firefox/manifest.json'])
      .pipe(
        jsonEditor({
          browser_specific_settings: {
            gecko: {
              id: 'emptydoremon@gmail.com',
              update_url:
                'https://raw.githubusercontent.com/quyentruong/MetaComicExtractor/main/MetaComicExtractor_Vue/updates_firefox.json',
              strict_min_version: '112.0',
            },
          },
        }),
      )
      .pipe(gulp.dest('./build_firefox'))
  })

  gulp.task('moveFileXPI', () => {
    return gulp
      .src(path.join(__dirname, 'generate', '*.xpi'))
      .pipe(rename(`${packageData.name}.xpi`))
      .pipe(gulp.dest(path.join(__dirname, 'dist'), { overwrite: true }))
  })

  gulp.task('cleanGenerate', () => {
    return gulp.src(path.join(__dirname, 'generate', '*.xpi'), { read: false }).pipe(clean())
  })

  gulp.task('firefox_clean', gulp.series('moveFileXPI', 'cleanGenerate'))

  gulp.task(
    'packFirefox',
    shell.task(
      `web-ext sign --api-key=${env.FIREFOX_API_KEY} --api-secret=${env.FIREFOX_API_SECRET} --channel=unlisted --artifacts-dir=${__dirname}/generate --source-dir=${__dirname}/build_firefox`,
    ),
  )

  // Add a Gulp task to zip all files in the build_firefox directory
  gulp.task('zipFirefox', () => {
    return gulp
      .src('./build_firefox/**/*') // Select all files and subdirectories in build_firefox
      .pipe(zip(`${packageData.name}.zip`)) // Create a zip file with the package name
      .pipe(gulp.dest('./dist')); // Save the zip file in the dist directory
  });

  gulp.task(
    'firefox',
    gulp.series(
      'removeUseDynamicUrl',
      'addBrowserSpecificSettings',
      'createUpdateJSON',
      'packFirefox',
      'firefox_clean',
    ),
  )
}
