const listWebsites = ['nettruyen', 'nhattruyen', 'ngonphong', 'a3manga',
  'mangatoon', 'cmanga', 'truyenqq', 'phetruyen', 'mangatx', 'webtoon.xyz', 'vlogtruyen', 'aqua-manga', 'toptruyen', 'doctruyen3q'];
// 1st match nettruyen, toptruyen, doctruyen3q
// 2nd match mangatoon
// 3rd match ngonphong
// 4th match cmanga, truyenqq, phetruyen, vlogtruyen
// 5th match mangatx, webtoon.xyz, aqua-manga
const patterns: string[] = [
  '*://*/truyen-tranh/*/chap*/*',
  '*://h5.mangatoon.mobi/cartoons/watch/*/*',
  '*://*/*chap*/',
  '*://*/*/*chap*',
  '*://*/*/*/chapter*',
];

const listChapterPatterns: string[] = ['*://*/truyen-tranh/*'];
const apiWebsite = "https://mangamark.qtmontreal.ddnsgeek.com"

export { patterns, listChapterPatterns, apiWebsite, listWebsites };
