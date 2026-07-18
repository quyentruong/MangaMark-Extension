import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import delay from "../utils/delay";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import removeElements from "../utils/removeElements";
import toDataString from "../utils/toDataString";
import Website from "./website";

export default class LuottruyenWebsite implements Website {
  name = 'luottruyen';
  getMangaOnRead() {
    const imgTags = Array.from(document.querySelectorAll(".reading-detail .page-chapter img")) as HTMLImageElement[];
    for (let imgTag of imgTags) {
      imgTag.style.position = "static";
      imgTag.style.setProperty('width', '100vw', 'important');
      imgTag.style.setProperty('max-width', '100%', 'important');
    }
    let fTitleChapter = Array.from(document.querySelectorAll<HTMLElement>("a[itemprop='item']"));
    
    updateManga({
      title: toDataString(fTitleChapter.at(-2)),
      chapNumber: getChapterNumber(fTitleChapter.at(-1)),
    })
  }
  
  async getMangaOnList() {    
    const title = document.querySelector('.title-detail')?.textContent?.trim() || '';
    
    updateManga({
      title: title,
    })

    await CacheMangaApi();
    if (isMangaSameName()) {
      await delay(3000);
      const selectors = [
        '#nt_listchapter > nav > ul > li'
      ];
      let listItems: Element[] = [];
      for (const selector of selectors) {
        listItems = Array.from(document.querySelectorAll(selector));
        if (listItems.length > 0) break;
      }
      
      handleChapterJump(listItems);
    }
  }

  blockAds() {
    
  }
}
