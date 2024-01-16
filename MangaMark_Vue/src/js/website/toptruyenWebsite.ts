import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import toDataString from "../utils/toDataString";
import Website from "./website";

export default class ToptruyenWebsite implements Website {
  name = 'toptruyen';
  getMangaOnRead() {
    const imgTags = Array.from(document.querySelectorAll("img"));
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
    }
    let fTitleChapter = document.title.split("Chap")

    updateManga({
      title: toDataString(fTitleChapter[0].trim()),
      chapNumber: getChapterNumber(fTitleChapter[1])
    })
  }
  async getMangaOnList() {
    updateManga({
      title: toDataString(document.querySelector<HTMLElement>('.title-manga')),
    })

    await CacheMangaApi();
    if (isMangaSameName()) {
      const listItems = Array.from(document.querySelectorAll('#list-chapter-dt > nav > ul > li'))
      handleChapterJump(listItems);
    }
  }


  blockAds() {

  }
}
