import fetchManga from "../fetchManga";
import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class ToptruyenWebsite implements Website {
  name = 'toptruyen';
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.title.split("Chap")

    result.chapNumber = getChapterNumber(fTitleChapter[1]);
    result.title = fTitleChapter[0].trim();
    return result;
  }
  async getMangaOnList() {
    const result = { ...initManga };
    result.title = document.querySelector<HTMLElement>('.title-manga').innerHTML.trim();
    const mangaApi = await fetchManga(result, true)
    if (mangaApi) {
      const listItems = Array.from(document.querySelectorAll('#list-chapter-dt > nav > ul > li'))
      for (let li in listItems) {
        const a = listItems[li].querySelector<HTMLElement>('a');
        handleChapterJump(a, mangaApi);
      }
    }

  }

  blockAds(): void {

  }
}
