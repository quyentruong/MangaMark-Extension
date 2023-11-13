import { initManga, isMangaSameName } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class VlogtruyenWebsite implements Website {
  name = 'vlogtruyen';
  getMangaOnRead() {
    let fTitleChapter = document.querySelector<HTMLElement>(".title-manga-read").innerText.split(":");

    initManga.chapNumber = getChapterNumber(fTitleChapter[1]);
    initManga.title = fTitleChapter[0].trim();
  }

  async getMangaOnList() {
    initManga.title = document.querySelector<HTMLElement>('.title-commic-detail').innerHTML.trim();
    await CacheMangaApi();
    if (isMangaSameName) {
      const list = document.querySelector('.ul-list-chaper-detail-commic')
      const observer = new MutationObserver(callback)

      observer.observe(list, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  }

  blockAds(): void {
    const fancyboxWrap = document.querySelectorAll('.fancybox-wrap')[0]
    if (fancyboxWrap) {
      fancyboxWrap.remove()
    }
  }
}

function callback(mutations: MutationRecord[]): void {
  for (let mutation of mutations) {
    if (mutation.target === document.querySelector('.ul-list-chaper-detail-commic')) {
      const list = mutation.target as Element
      const listItems = Array.from(list.querySelectorAll('li'))
      for (const li of listItems) {
        const a = li.querySelector<HTMLElement>('a')
        handleChapterJump(a)
      }
    }
  }
}
