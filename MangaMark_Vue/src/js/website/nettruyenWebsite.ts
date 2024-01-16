import { isMangaSameName, updateManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";
import handleChapterJump from "../utils/handleChapterJump";
import CacheMangaApi from "../utils/cacheMangaApi";
import toDataString from "../utils/toDataString";

export default class NettruyenWebsite implements Website {
  name = "nettruyen, nhattruyen, ngonphong, a3manga";
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
      title: toDataString(document.querySelector<HTMLElement>('.title-detail')),
    })

    await CacheMangaApi();
    if (isMangaSameName()) {
      const listItems = Array.from(document.querySelectorAll('#nt_listchapter > nav > ul > li'))
      handleChapterJump(listItems);
    }
  }

  blockAds(): void {
    const mrb5 = Array.from(document.querySelectorAll('.mrb5'))
    if (mrb5) {
      for (let mrb of mrb5) {
        mrb.remove()
      }
    }
  }

}
