import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";

export default class CmangaWebsite implements Website {
  name = "cmanga"
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    const content = document.getElementById('content');
    const observer = new MutationObserver(callback)
    function callback(mutations: MutationRecord[]): void {
      for (let mutation of mutations) {
        if (mutation.target === document.querySelector('div.chapter_content')) {

          const h1 = document.querySelector('h1')
          if (h1 && mutation.target === h1.parentNode) {
            result.chapNumber = getChapterNumber(h1.textContent)

          }
          const chapterMaskLayer = document.querySelector('div.chapter_mask_layer');
          if (chapterMaskLayer && mutation.target === chapterMaskLayer.parentNode) {
            chapterMaskLayer.parentNode.removeChild(chapterMaskLayer);
          }
        }
      }

    }

    observer.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    result.title = document.title.split('-')[0].trim();
    return result;
  }
  getMangaOnList: () => Manga;
  blockAds(): void {
    const fbRoot = document.getElementById('fb-root')
    if (fbRoot) {
      fbRoot.nextElementSibling.remove()
    }
  }
}
