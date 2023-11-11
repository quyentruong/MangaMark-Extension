import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";

export default class NettruyenWebsite implements Website {
  name = "nettruyen, nhattruyen, ngonphong, a3manga";
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    const imgTags = Array.from(document.querySelectorAll("img"));
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
    }
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")

    result.chapNumber = getChapterNumber(fTitleChapter[3]);
    result.title = fTitleChapter[2].innerHTML.trim();
    return result;
  }
  getMangaOnList(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.querySelectorAll("span[itemprop='name']")
    result.title = fTitleChapter[2].innerHTML.trim()
    return result
  }

  blockAds(): void {

  }

}
