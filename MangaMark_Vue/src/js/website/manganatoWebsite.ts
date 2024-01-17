import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import toDataString from "../utils/toDataString";
import Website from "./website";

export default class ManganatoWebsite implements Website {
  name = "manganato"
  getMangaOnRead(document: Document = window.document) {
    let fTitleChapter = document.title.split("Chapter")
    const temp = {
      title: toDataString(fTitleChapter[0]),
      chapNumber: getChapterNumber(fTitleChapter[1])
    }
    updateManga({
      ...temp
    })
    return {
      ...temp
    }
  }
  async getMangaOnList(document: Document = window.document, isTest: boolean = false) {
    const listItems = Array.from(document.querySelectorAll('ul.row-content-chapter > li'))
    const temp = {
      title: toDataString(document.querySelector('h1')),
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
  blockAds() {

  }

}
