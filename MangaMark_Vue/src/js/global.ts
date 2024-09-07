import packageData from '../../package.json'

const packageName = packageData.displayName
const version = packageData.version
const listWebsites = [
  'nettruyen',
  'nhattruyen',
  'ngonphong (dead)',
  'a3manga (dead)',
  'h5.mangatoon.mobi',
  'cmanga',
  'truyenqq',
  'phetruyen (block)',
  'webtoon.xyz',
  'vlogtruyen',
  'aqua-manga.com',
  'aquamanga',
  'toptruyen',
  'doctruyen3q',
  'manganato (unstable)',
  'toonclash',
  'fastscans',
]
// 1st match nettruyen, toptruyen, doctruyen3q
// 2nd match mangatoon
// 3rd match ngonphong
// 4th match a3manga
// 4th match cmanga, truyenqq, phetruyen, vlogtruyen
// 5th match mangatx, webtoon.xyz, aqua-manga
const patterns = [
  '*://*/truyen-tranh/*/chap*/*',
  '*://*/truyen-tranh/*/chuong-*',
  '*://*/truyen-tranh/*/chap-*',
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
// https://cmangaog.com/album/sieu-cap-than-co-nhan-25945 Note: Need to match exactly to album
const listChapterPatterns = [
  '*://*/truyen-tranh/*',
  '*://*/manga/*',
  '*://*/truyen-tranh/*/*',
  '*://vlogtruyen*.com/*',
  '*://phetruyen.*/*',
  '*://www.webtoon.xyz/read/*/',
  '*://cmanga*.com/album/*',
  '*://manganato.*/manga-*'
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
