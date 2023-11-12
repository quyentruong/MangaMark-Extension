import fetchManga from "../fetchManga";
import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class MangatxWebsite implements Website {
  name = 'mangatx';
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.title

    result.chapNumber = getChapterNumber(fTitleChapter);
    result.title = fTitleChapter.split("-")[0].trim();
    return result;
  }
  async getMangaOnList() {
    const result = { ...initManga };
    result.title = document.querySelector<HTMLElement>('h1').innerHTML.trim();
    const mangaApi = await fetchManga(result, true)
    if (mangaApi) {
      const list = document.querySelector('.listing-chapters_wrap > ul')
      const listItems = list.querySelectorAll('li');
      for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i];
        const a = li.querySelector<HTMLElement>('a');
        handleChapterJump(a, mangaApi)
      }
    }
    return result
  }

  blockAds(): void {

  }
}
