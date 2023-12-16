import { initManga, isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class ManganatoWebsite implements Website {
  name = "manganato"
  getMangaOnRead() {
    let fTitleChapter = document.title.split("Chapter")
    updateManga({
      title: fTitleChapter[0].trim(),
      chapNumber: getChapterNumber(fTitleChapter[1])
    })
  }
  async getMangaOnList() {
    updateManga({
      title: document.querySelector("h1")?.innerText.trim(),
    })

    await CacheMangaApi();
    if (isMangaSameName()) {
      const listItems = Array.from(document.querySelectorAll('ul.row-content-chapter > li'))
      handleChapterJump(listItems);
    }
  }
  blockAds() {

  }

}
