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
      const listItems = Array.from(document.querySelectorAll('div.works-chapter-list > div.works-chapter-item'))
      for (const li of listItems) {
        const a = li.querySelector<HTMLElement>('a');
        handleChapterJump(a, mangaApi);
      }
    }
  }

  blockAds(): void {

  }
}
