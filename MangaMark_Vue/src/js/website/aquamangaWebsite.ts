import fetchManga from "../fetchManga";
import { Manga, MangaApi, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class AqumangaWebsite implements Website {
  name = 'aqumanga';
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.querySelector<HTMLElement>("#chapter-heading").innerText.split("-");

    result.chapNumber = getChapterNumber(fTitleChapter[1]);
    result.title = fTitleChapter[0].trim();
    return result;
  }
  async getMangaOnList() {
    const result = { ...initManga };
    result.title = document.querySelector<HTMLElement>('h1').innerHTML.trim();
    console.log(result.title)
    const mangaApi = await fetchManga(result, true)
    if (mangaApi) {
      const list = document.querySelector('#manga-chapters-holder')
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

  }
}

function callback(mutations: MutationRecord[], mangaApi: MangaApi): void {
  for (let mutation of mutations) {
    if (mutation.target === document.querySelector('#manga-chapters-holder')) {
      let list = mutation.target as Element
      list = list.querySelector('ul')
      const listItems = list.querySelectorAll('li');
      for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i];
        const a = li.querySelector<HTMLElement>('a');
        handleChapterJump(a, mangaApi)
      }
    }
  }
}
