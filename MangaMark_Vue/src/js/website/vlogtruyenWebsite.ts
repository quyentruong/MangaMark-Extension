import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";

export default class VlogtruyenWebsite implements Website {
  name = 'vlogtruyen';
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.querySelector<HTMLElement>(".title-manga-read").innerText.split(":");

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
    const fancyboxWrap = document.querySelectorAll('.fancybox-wrap')[0]
    if (fancyboxWrap) {
      fancyboxWrap.remove()
    }
  }
}
