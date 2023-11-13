import { initManga, isMangaSameName } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";
import handleChapterJump from "../utils/handleChapterJump";
import CacheMangaApi from "../utils/cacheMangaApi";

export default class NgonphongWebsite implements Website {
  name = "ngonphong, a3manga";
  getMangaOnRead() {
    const imgTags = Array.from(document.querySelectorAll("img"));
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
    }
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")

    initManga.chapNumber = getChapterNumber(fTitleChapter[3]);
    initManga.title = fTitleChapter[2].innerHTML.trim();
  }
  async getMangaOnList() {
    initManga.title = document.querySelector<HTMLElement>('.info-title').innerHTML.trim();
    await CacheMangaApi();
    if (isMangaSameName) {
      const listItems = Array.from(document.querySelectorAll('.table > tbody > tr'))
      for (const li of listItems) {
        const a = li.querySelector<HTMLElement>('a');
        handleChapterJump(a);
      }
    }
  }

  blockAds(): void {
    const pvoucherLiveContainer = document.querySelector('#pvoucher-live-container')
    if (pvoucherLiveContainer) {
      pvoucherLiveContainer.remove()
    }
  }

}
