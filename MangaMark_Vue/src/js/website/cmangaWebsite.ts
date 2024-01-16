import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import delay from "../utils/delay";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import toDataString from "../utils/toDataString";
import Website from "./website";

export default class CmangaWebsite implements Website {
  name = "cmanga"
  getMangaOnRead() {
    const content = document.getElementById('content') as HTMLElement;
    const observer = new MutationObserver(callback)
    function callback(mutations: MutationRecord[]): void {
      for (let mutation of mutations) {
        if (mutation.target === document.querySelector('div.chapter_content')) {
          const h1 = document.querySelector('h1')
          if (h1 && mutation.target === h1.parentNode) {
            updateManga({
              chapNumber: getChapterNumber(toDataString(h1.textContent)),
            })
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

    updateManga({
      title: document.title.split('-')[0].trim(),
    })

  }
  async getMangaOnList() {
    updateManga({
      title: toDataString(document.querySelector('h1')),
    })

    await CacheMangaApi()

    if (isMangaSameName()) {
      await delay(1000);
      const listItems = Array.from(document.querySelectorAll('.list_chapter > table > tbody tr'));
      handleChapterJump(listItems);
    }
  };
  blockAds(): void {
    const fbRoot = document.getElementById('fb-root')
    if (fbRoot) {
      fbRoot.nextElementSibling?.remove()
    }
    const popupContent = document.getElementById('popup_content')
    if (popupContent) {
      popupContent.remove()
    }
  }
}
