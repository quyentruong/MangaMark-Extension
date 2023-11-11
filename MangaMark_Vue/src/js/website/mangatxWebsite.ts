import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";

export default class MangatxWebsite implements Website {
  name = 'mangatx';
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.title

    result.chapNumber = getChapterNumber(fTitleChapter);
    result.title = fTitleChapter.split("-")[0].trim();
    return result;
  }
  getMangaOnList(): Manga {
    const result = { ...initManga };
    // let fTileChapter = document.querySelectorAll("span[itemprop='name']")
    // result.title = fTileChapter[2].innerHTML.trim()
    return result
  }

  blockAds(): void {

  }
}
