import gulp from 'gulp'
import shell from 'gulp-shell'
import rename from 'gulp-rename'
import clean from 'gulp-clean'
import path from 'path'
import builder from 'xmlbuilder'
import fs from 'fs'
import packageData from '../package.json' assert { type: 'json' }
import logWithTimestamp from '../src/js/utils/logWithTimestamp.js'

export default function chromeTask(__dirname) {
  async function createUpdateXML() {
    const doc = builder
      .create('gupdate', { encoding: 'UTF-8' })
      .att('xmlns', 'http://www.google.com/update2/response')
      .att('protocol', '2.0')
      .ele('app')
      .att('appid', 'fdmcgbkgpjiggcfpoehpfkiapofheada')
      .ele('updatecheck')
      .att(
        'codebase',
        `https://github.com/quyentruong/MangaMark-Extension/releases/latest/download/${packageData.name}.v${packageData.version}.crx`,
      )
      .att('version', packageData.version)
      .up()
      .up()

    const xml = doc.end({ pretty: true })
    fs.writeFile('../updates.xml', xml, function (err) {
      if (err) throw err
      logWithTimestamp('Created updates.xml')
    })
  }

  gulp.task('createUpdateXML', createUpdateXML)

  // move build.crx to dist, but didn't remove build.crx
  gulp.task('moveFileCRX', () => {
    return gulp
      .src(path.join(__dirname, 'build.crx'))
      .pipe(rename(`${packageData.name}.v${packageData.version}.crx`))
      .pipe(gulp.dest(path.join(__dirname, 'dist')))
  })

  gulp.task('cleanBuild', function () {
    return gulp.src(path.join(__dirname, 'build.crx'), { read: false }).pipe(clean())
  })

  // chrome
  gulp.task(
    'packChrome',
    // shell.task(
    //   `chrome.exe --pack-extension=${__dirname}/build --pack-extension-key=${__dirname}/${packageData.name}.pem`,
    // ),
    shell.task(
      `D:/Thorium_AVX2_117.0.5938.157/BIN/thorium.exe --pack-extension=${__dirname}/build --pack-extension-key=${__dirname}/${packageData.name}.pem`,
    ),
  )

  gulp.task('chrome', gulp.series('packChrome', 'moveFileCRX', 'cleanBuild', 'createUpdateXML'));
}
