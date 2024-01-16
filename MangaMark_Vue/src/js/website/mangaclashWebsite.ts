import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import toDataString from "../utils/toDataString";
import Website from "./website";

export default class MangaclashWebsite implements Website {
  name = 'mangaclash';
  getMangaOnRead() {
    let fTitleChapter = toDataString(document.querySelector('h1'))

    updateManga({
      title: fTitleChapter.split("-")[0].trim(),
      chapNumber: getChapterNumber(fTitleChapter)
    })
  }
  async getMangaOnList() {
    updateManga({
      title: toDataString(document.querySelector<HTMLElement>('h1')),
    })

    await CacheMangaApi();
    if (isMangaSameName()) {
      const listItems = Array.from(document.querySelectorAll('.listing-chapters_wrap > ul > li'))
      handleChapterJump(listItems);
    }
  }

  blockAds(): void {

  }
}
