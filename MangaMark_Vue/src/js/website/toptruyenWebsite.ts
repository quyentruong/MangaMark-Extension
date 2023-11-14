import { initManga, isMangaSameName } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class ToptruyenWebsite implements Website {
  name = 'toptruyen';
  getMangaOnRead() {
    const imgTags = Array.from(document.querySelectorAll("img"));
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
    }
    let fTitleChapter = document.title.split("Chap")

    initManga.chapNumber = getChapterNumber(fTitleChapter[1]);
    initManga.title = fTitleChapter[0].trim();
  }
  async getMangaOnList() {
    initManga.title = document.querySelector<HTMLElement>('.title-manga').innerHTML.trim();
    await CacheMangaApi();
    if (isMangaSameName) {
      const listItems = Array.from(document.querySelectorAll('#list-chapter-dt > nav > ul > li'))
      handleChapterJump(listItems);
    }
  }


  blockAds() {

  }
}
