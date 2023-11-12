import fetchManga from "../fetchManga";
import { Manga, MangaApi, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class VlogtruyenWebsite implements Website {
  name = 'vlogtruyen';
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.querySelector<HTMLElement>(".title-manga-read").innerText.split(":");

    result.chapNumber = getChapterNumber(fTitleChapter[1]);
    result.title = fTitleChapter[0].trim();
    return result;
  }

  async getMangaOnList() {
    const result = { ...initManga };
    result.title = document.querySelector<HTMLElement>('.title-commic-detail').innerHTML.trim();
    const mangaApi = await fetchManga(result, true)
    if (mangaApi) {
      const list = document.querySelector('.ul-list-chaper-detail-commic')
      const observer = new MutationObserver((mutations: MutationRecord[]) => {
        callback(mutations, mangaApi);
      });

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

function callback(mutations: MutationRecord[], mangaApi: MangaApi): void {
  for (let mutation of mutations) {
    if (mutation.target === document.querySelector('.ul-list-chaper-detail-commic')) {
      const list = mutation.target as Element
      const listItems = Array.from(list.querySelectorAll('li'))
      for (const li of listItems) {
        const a = li.querySelector<HTMLElement>('a')
        handleChapterJump(a, mangaApi)
      }
    }
  }
}
