import { Manga, isMangaSameName, updateManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";
import handleChapterJump from "../utils/handleChapterJump";
import CacheMangaApi from "../utils/cacheMangaApi";
import toDataString from "../utils/toDataString";

export default class NettruyenWebsite implements Website {
  name = "nettruyen, nhattruyen";
  getMangaOnRead(document: Document = window.document): Manga {
    const imgTags = Array.from(document.querySelectorAll("img"));
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
    }
    let fTitleChapter = Array.from(document.querySelectorAll<HTMLElement>("span[itemprop='name']"));
    const temp = {
      title: toDataString(fTitleChapter.at(-2)),
      chapNumber: getChapterNumber(fTitleChapter.at(-1)),
    }
    updateManga({
      ...temp
    })
    return {
      ...temp
    }
  }
  async getMangaOnList(document: Document = window.document, isTest: boolean = false): Promise<Manga> {
    const listItems = Array.from(document.querySelectorAll('#nt_listchapter > nav > ul > li'))
    const temp = {
      title: toDataString(document.querySelector<HTMLElement>('.title-detail')),
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
    const mrb5 = Array.from(document.querySelectorAll('.mrb5'))
    if (mrb5) {
      for (let mrb of mrb5) {
        mrb.remove()
      }
    }
  }

}
