import gulp from 'gulp'
import path from 'path'
import { execa } from 'execa'
import { fileURLToPath } from 'url'
import env from './env.json' assert { type: 'json' }
import packageData from './package.json' assert { type: 'json' }
import chromeTask from './gulp/chromeTask.js'
import firefoxTask from './gulp/firefoxTask.js'
import extractPatchNotes from './gulp/extractPatchNotes.js'

// console.log(packageData);

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// print output of commands into the terminal
const stdio = 'inherit'
chromeTask(__dirname)
firefoxTask(__dirname)

async function listReleases() {
  await execa(
    'github-release',
    [
      'list',
      '--token',
      env.GH_TOKEN,
      '--owner',
      'quyentruong',
      '--repo',
      packageData.name,
    ],
    { stdio },
  )
}

// https://github.com/cheton/github-release-cli
async function uploadRelease() {
  await execa(
    'github-release',
    [
      'upload',
      '--token',
      env.GH_TOKEN,
      '--owner',
      'quyentruong',
      '--repo',
      packageData.name,
      '--tag',
      packageData.version,
      '--release-name',
      packageData.version,
      '--body',
      extractPatchNotes(__dirname, packageData.version),
      '--prerelease',
      false,
      `dist/${packageData.name}.crx`,
      `dist/${packageData.name}.xpi`, // Add the second file here
    ],
    { stdio },
  )
}

async function deleteRelease() {
  await execa(
    'github-release',
    [
      'delete',
      '--token',
      env.GH_TOKEN,
      '--owner',
      'quyentruong',
      '--repo',
      packageData.name,
      '--tag',
      packageData.version,
    ],
    { stdio },
  )
}

gulp.task('list_releases', listReleases)
gulp.task('release', uploadRelease)
gulp.task('delete_release', deleteRelease)
