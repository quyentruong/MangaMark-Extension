import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";

export default class ToptruyenWebsite implements Website {
  name = 'toptruyen';
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.title.split("Chap")

    result.chapNumber = getChapterNumber(fTitleChapter[1]);
    result.title = fTitleChapter[0].trim();
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
