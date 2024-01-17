import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import toDataString from "../utils/toDataString";
import Website from "./website";

export default class VlogtruyenWebsite implements Website {
  name = 'vlogtruyen';
  getMangaOnRead(document: Document = window.document) {
    let fTitleChapter = toDataString(document.querySelector<HTMLElement>(".title-manga-read")).split(":");

    const temp = {
      title: toDataString(fTitleChapter[0]),
      chapNumber: getChapterNumber(fTitleChapter[1])
    }
    updateManga({
      ...temp
    })
    return {
      ...temp
    }
  }

  async getMangaOnList() {
    updateManga({
      title: toDataString(document.querySelector<HTMLElement>('.title-commic-detail')),
    })
    await CacheMangaApi();
    if (isMangaSameName()) {
      const list = document.querySelector('.ul-list-chaper-detail-commic') as Element
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
      handleChapterJump(listItems);
    }
  }
}
