import gulp from 'gulp'
import path from 'path'
import { execa } from 'execa'
import { fileURLToPath } from 'url'
import env from './env.json' with { type: 'json' }
import packageData from './package.json' with { type: 'json' }
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
    'gh',
    ['release', 'list'],
    { stdio },
  )
}

const patchNotes = '<br/>' + extractPatchNotes(__dirname, packageData.version)
console.log(patchNotes)
// https://github.com/cheton/github-release-cli
async function uploadRelease() {
  await execa(
    'gh',
    [
      'release',
      'create',
      packageData.version,
      '--notes',
      patchNotes,
      '--title',
      packageData.version,
      `dist/${packageData.name}.v${packageData.version}.crx`,
    ],
    { stdio },
  )
}

async function deleteRelease() {
  await execa(
    'gh',
    [
      'release',
      'delete',
      packageData.version,
      '--cleanup-tag'
    ],
    { stdio },
  )
}

gulp.task('list_releases', listReleases)
gulp.task('release', uploadRelease)
gulp.task('delete_release', deleteRelease)
