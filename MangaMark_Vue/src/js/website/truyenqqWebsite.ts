import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import toDataString from "../utils/toDataString";
import Website from "./website";

export default class TruyenqqWebsite implements Website {
  name = 'truyenqq';
  getMangaOnRead(document: Document = window.document) {
    const imgTags = Array.from(document.querySelectorAll("img"));
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
    }
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")
    const temp = {
      title: toDataString(fTitleChapter[1]),
      chapNumber: getChapterNumber(fTitleChapter[2])
    }
    updateManga({
      ...temp
    })
    return {
      ...temp
    }
  }
  async getMangaOnList(document: Document = window.document, isTest: boolean = false) {
    const listItems = Array.from(document.querySelectorAll('div .works-chapter-item'))
    const temp = {
      title: toDataString(document.querySelector<HTMLElement>('h1')),
      listSize: listItems.length
    }
    updateManga({
      ...temp
    })

    if (!isTest) {
      await CacheMangaApi();
      if (isMangaSameName()) {
        handleChapterJump(listItems);
      }
    }
    return {
      ...temp
    }
  }

  blockAds(): void {

  }
}
