import Swal from "sweetalert2";
import fetchManga from "../fetchManga";
import { Manga, MangaApi, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";
import { packageName } from "../global";
import handleChapterJump from "../utils/handleChapterJump";

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
  async getMangaOnList() {
    const result = { ...initManga };
    result.title = document.querySelector<HTMLElement>('.title-detail').innerHTML.trim();
    const mangaApi = await fetchManga(result, true)
    if (mangaApi) {
      const listItems = Array.from(document.querySelectorAll('#nt_listchapter > nav > ul > li'))
      for (const li of listItems) {
        const a = li.querySelector<HTMLElement>('a');
        handleChapterJump(a, mangaApi);
      }
    }
  }

  blockAds(): void {

  }

}
