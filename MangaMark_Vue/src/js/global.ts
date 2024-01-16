import packageData from '../../package.json'

const packageName = packageData.displayName
const version = packageData.version
const listWebsites = [
  'nettruyen',
  'nhattruyen',
  'ngonphong',
  'a3manga',
  'h5.mangatoon.mobi',
  'cmanga',
  'truyenqq',
  'phetruyen.net',
  'webtoon.xyz',
  'vlogtruyen',
  'aqua-manga',
  'aquamanga',
  'toptruyen',
  'doctruyen3q',
  'manganato',
  'mangaclash'
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
  '*://chapmanganato.*/manga-*/chapter-*'
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
  '*://chapmanganato.*/manga-*'
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
