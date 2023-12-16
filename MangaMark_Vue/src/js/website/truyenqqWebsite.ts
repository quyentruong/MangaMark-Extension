import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import { toDataString } from "../utils/toDataString";
import Website from "./website";

export default class TruyenqqWebsite implements Website {
  name = 'truyenqq';
  getMangaOnRead() {
    const imgTags = Array.from(document.querySelectorAll("img"));
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
    }
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")

    updateManga({
      title: toDataString(fTitleChapter[1].innerHTML.trim()),
      chapNumber: getChapterNumber(fTitleChapter[2])
    })
  }
  async getMangaOnList() {
    updateManga({
      title: toDataString(document.querySelector<HTMLElement>('h1')?.innerHTML.trim()),
    })
    await CacheMangaApi();

    if (isMangaSameName()) {
      const listItems = Array.from(document.querySelectorAll('div .works-chapter-item'))
      handleChapterJump(listItems);
    }
  }

  blockAds(): void {

  }
}
