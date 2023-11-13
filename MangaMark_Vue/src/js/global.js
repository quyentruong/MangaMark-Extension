import packageData from '../../package.json' assert { type: 'json' }
import { initManga, initMangaApi } from './types/manga'

const packageName = packageData.displayName
const version = packageData.version
const listWebsites = [
  'nettruyen',
  'nhattruyen',
  'ngonphong',
  'a3manga',
  'mangatoon',
  'cmanga',
  'truyenqq',
  'phetruyen (saytruyen)',
  'mangatx',
  'webtoon.xyz',
  'vlogtruyen',
  'aqua-manga',
  'aquamanga',
  'toptruyen',
  'doctruyen3q',
]
// 1st match nettruyen, toptruyen, doctruyen3q
// 2nd match mangatoon
// 3rd match ngonphong
// 4th match a3manga
// 4th match cmanga, truyenqq, phetruyen, vlogtruyen
// 5th match mangatx, webtoon.xyz, aqua-manga
const patterns = [
  '*://*/truyen-tranh/*/chap*/*',
  '*://h5.mangatoon.mobi/cartoons/watch/*/*',
  '*://*/*chap*/',
  '*://*/*/*-chap-*',
  '*://*/*/*chap*',
  '*://*/*/*/chapter*',
  '*://*/*/*/*/*chapter*',
]

// 1st match nettruyen
// 2nd match mangatx
// 3rd match toptruyen
const listChapterPatterns = [
  '*://*/truyen-tranh/*',
  '*://*/manga/*',
  '*://*/truyen-tranh/*/*',
  '*://vlogtruyen5.com/*',
  '*://phetruyen.net/*',
  '*://www.webtoon.xyz/read/*/',
  '*://cmangaaz.com/*',
]

const requestReCache = {
  value: false,
}

const apiWebsite = 'https://mangamark.qtmontreal.ddnsgeek.com'

export {
  patterns,
  listChapterPatterns,
  apiWebsite,
  listWebsites,
  packageName,
  version,
  requestReCache,
}
