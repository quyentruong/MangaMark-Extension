import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";

export default class TruyenqqWebsite implements Website {
  name = 'truyenqq';
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")

    result.chapNumber = getChapterNumber(fTitleChapter[2]);
    result.title = fTitleChapter[1].innerHTML.trim();
    return result;
  }
  getMangaOnList(): Manga {
    const result = { ...initManga };
    // let fTitleChapter = document.querySelectorAll("span[itemprop='name']")
    // result.title = fTitleChapter[2].innerHTML.trim()
    return result
  }

  blockAds(): void {

  }
}
