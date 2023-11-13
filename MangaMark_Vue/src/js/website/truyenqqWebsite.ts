import { initManga, isMangaSameName } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class TruyenqqWebsite implements Website {
  name = 'truyenqq';
  getMangaOnRead() {
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")

    initManga.chapNumber = getChapterNumber(fTitleChapter[2]);
    initManga.title = fTitleChapter[1].innerHTML.trim();
  }
  async getMangaOnList() {
    initManga.title = document.querySelector<HTMLElement>('h1').innerHTML.trim();
    if (isMangaSameName) {
      const listItems = Array.from(document.querySelectorAll('div.works-chapter-list > div.works-chapter-item'))
      for (const li of listItems) {
        const a = li.querySelector<HTMLElement>('a');
        handleChapterJump(a);
      }
    }
  }

  blockAds(): void {

  }
}
