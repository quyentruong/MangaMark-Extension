import { initManga, isMangaSameName } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import { toDataString } from "../utils/toDataString";
import Website from "./website";

export default class MangatxWebsite implements Website {
  name = 'mangatx';
  getMangaOnRead() {
    let fTitleChapter = document.title

    initManga.chapNumber = getChapterNumber(fTitleChapter);
    initManga.title = fTitleChapter.split("-")[0].trim();
  }
  async getMangaOnList() {
    initManga.title = toDataString(document.querySelector<HTMLElement>('h1')?.innerHTML.trim());
    await CacheMangaApi();
    if (isMangaSameName()) {
      const listItems = Array.from(document.querySelectorAll('.listing-chapters_wrap > ul > li'))
      handleChapterJump(listItems);
    }
  }

  blockAds(): void {

  }
}
