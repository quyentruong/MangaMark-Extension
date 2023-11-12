import fetchManga from "../fetchManga";
import { Manga, initManga } from "../types/manga";
import delay from "../utils/delay";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
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
            chrome.runtime.sendMessage({ command: 'startAlarm' });
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
  async getMangaOnList() {
    const result = { ...initManga };
    result.title = document.querySelector('h1').textContent.trim();
    const mangaApi = await fetchManga(result, true)

    if (mangaApi) {
      await delay(1000);
      const listItems = Array.from(document.querySelectorAll('.list_chapter > table > tbody tr'));
      for (const li of listItems) {
        const a = li.querySelector<HTMLElement>('a');
        handleChapterJump(a, mangaApi);
      }

    }
  };
  blockAds(): void {
    const fbRoot = document.getElementById('fb-root')
    if (fbRoot) {
      fbRoot.nextElementSibling.remove()
    }
  }
}

