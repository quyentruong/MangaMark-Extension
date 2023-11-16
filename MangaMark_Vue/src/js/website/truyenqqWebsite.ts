import { initManga, isMangaSameName } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import { toDataString } from "../utils/toDataString";
import Website from "./website";

export default class TruyenqqWebsite implements Website {
  name = 'truyenqq';
  getMangaOnRead() {
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")

    initManga.chapNumber = getChapterNumber(fTitleChapter[2]);
    initManga.title = fTitleChapter[1].innerHTML.trim();
  }
  async getMangaOnList() {
    initManga.title = toDataString(document.querySelector<HTMLElement>('h1')?.innerHTML.trim());
    await CacheMangaApi();

    if (isMangaSameName()) {
      const listItems = Array.from(document.querySelectorAll('div .works-chapter-item'))

      handleChapterJump(listItems);
    }
  }

  blockAds(): void {

  }
}
