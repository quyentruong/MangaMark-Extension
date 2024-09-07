import { Manga, isMangaSameName, updateManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";
import handleChapterJump from "../utils/handleChapterJump";
import CacheMangaApi from "../utils/cacheMangaApi";
import toDataString from "../utils/toDataString";

export default class FastscansWebsite implements Website {
  name = "fastscans";
  getMangaOnRead(document: Document = window.document): Manga {
    let fTitleChapter = document.querySelectorAll<HTMLElement>(".breadcrumb-content li")
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
  async getMangaOnList(document: Document = window.document, isTest: boolean = false): Promise<Manga> {
    const listItems = Array.from(document.querySelectorAll('.chapter-list'))
    const temp = {
      title: toDataString(document.querySelector<HTMLElement>('h1')),
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

  }

}
