import { initManga, isMangaSameName } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";
import handleChapterJump from "../utils/handleChapterJump";
import CacheMangaApi from "../utils/cacheMangaApi";
import { toDataString } from "../utils/toDataString";

export default class NettruyenWebsite implements Website {
  name = "nettruyen, nhattruyen, ngonphong, a3manga";
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
    initManga.title = toDataString(document.querySelector<HTMLElement>('.title-detail')?.innerHTML.trim());

    await CacheMangaApi();
    if (isMangaSameName()) {
      const listItems = Array.from(document.querySelectorAll('#nt_listchapter > nav > ul > li'))
      handleChapterJump(listItems);
    }
  }

  blockAds(): void {

  }

}
