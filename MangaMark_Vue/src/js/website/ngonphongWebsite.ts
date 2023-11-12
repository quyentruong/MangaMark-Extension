import fetchManga from "../fetchManga";
import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";
import handleChapterJump from "../utils/handleChapterJump";

export default class NgonphongWebsite implements Website {
  name = "ngonphong, a3manga";
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    const imgTags = Array.from(document.querySelectorAll("img"));
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
    }
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")

    result.chapNumber = getChapterNumber(fTitleChapter[3]);
    result.title = fTitleChapter[2].innerHTML.trim();
    return result;
  }
  async getMangaOnList() {
    const result = { ...initManga };
    result.title = document.querySelector<HTMLElement>('.info-title').innerHTML.trim();
    const mangaApi = await fetchManga(result, true)
    if (mangaApi) {
      const list = document.querySelector('.table > tbody')
      const listItems = list.querySelectorAll('tr');
      for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i];
        const a = li.querySelector<HTMLElement>('td > a');
        handleChapterJump(a, mangaApi)
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
