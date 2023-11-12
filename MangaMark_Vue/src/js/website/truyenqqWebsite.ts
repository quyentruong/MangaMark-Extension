import fetchManga from "../fetchManga";
import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class TruyenqqWebsite implements Website {
  name = 'truyenqq';
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")

    result.chapNumber = getChapterNumber(fTitleChapter[2]);
    result.title = fTitleChapter[1].innerHTML.trim();
    return result;
  }
  async getMangaOnList() {
    const result = { ...initManga };
    result.title = document.querySelector<HTMLElement>('h1').innerHTML.trim();
    const mangaApi = await fetchManga(result, true)
    if (mangaApi) {
      const list = document.querySelector('div.list_chapter')
      const listItems = list.querySelectorAll('div.works-chapter-item');
      for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i];
        const a = li.querySelector<HTMLElement>('div > a');
        handleChapterJump(a, mangaApi)
      }
    }
  }

  blockAds(): void {

  }
}
