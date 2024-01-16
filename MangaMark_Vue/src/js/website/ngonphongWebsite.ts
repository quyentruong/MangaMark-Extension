import { isMangaSameName, updateManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";
import handleChapterJump from "../utils/handleChapterJump";
import CacheMangaApi from "../utils/cacheMangaApi";
import toDataString from "../utils/toDataString";

export default class NgonphongWebsite implements Website {
  name = "ngonphong, a3manga";
  getMangaOnRead() {
    const imgTags = Array.from(document.querySelectorAll("img"));
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
    }
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")

    updateManga({
      title: toDataString(fTitleChapter[2]),
      chapNumber: getChapterNumber(fTitleChapter[3])
    })
  }
  async getMangaOnList() {
    updateManga({
      title: toDataString(document.querySelector<HTMLElement>('.info-title')),
    })

    await CacheMangaApi();
    if (isMangaSameName()) {
      const listItems = Array.from(document.querySelectorAll('.table > tbody > tr'))
      handleChapterJump(listItems);
    }
  }

  blockAds(): void {
    const pvoucherLiveContainer = document.querySelector('#pvoucher-live-container')
    if (pvoucherLiveContainer) {
      pvoucherLiveContainer.remove()
    }
  }

}
