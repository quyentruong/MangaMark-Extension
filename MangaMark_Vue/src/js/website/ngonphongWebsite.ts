import { isMangaSameName, updateManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";
import handleChapterJump from "../utils/handleChapterJump";
import CacheMangaApi from "../utils/cacheMangaApi";
import toDataString from "../utils/toDataString";

export default class NgonphongWebsite implements Website {
  name = "ngonphong, a3manga";
  getMangaOnRead(document: Document = window.document) {
    const imgTags = Array.from(document.querySelectorAll("img"));
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
    }
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")
    const temp = {
      title: toDataString(fTitleChapter[2]),
      chapNumber: getChapterNumber(fTitleChapter[3])
    }
    updateManga({
      ...temp
    })
    return {
      ...temp
    }
  }
  async getMangaOnList(document: Document = window.document, isTest: boolean = false) {
    const listItems = Array.from(document.querySelectorAll('.table > tbody > tr'))
    const temp = {
      title: toDataString(document.querySelector<HTMLElement>('.info-title')),
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
    const pvoucherLiveContainer = document.querySelector('#pvoucher-live-container')
    if (pvoucherLiveContainer) {
      pvoucherLiveContainer.remove()
    }
  }

}
