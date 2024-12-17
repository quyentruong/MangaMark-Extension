import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import delay from "../utils/delay";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import removeCookie from "../utils/removeCookie";
import removeElements from "../utils/removeElements";
import toDataString from "../utils/toDataString";
import Website from "./website";

export default class CmangaWebsite implements Website {
  name = "cmanga"
  getMangaOnRead() {
    var nameElements = document.querySelectorAll('[itemprop="name"]');

    const content = document.getElementById('content') as HTMLElement;
    const observer = new MutationObserver(callback)
    function callback(mutations: MutationRecord[]): void {
      for (let mutation of mutations) {
        const selectedElement = document.querySelector('.chapter_list') as HTMLSelectElement;
        if (mutation.target === selectedElement) {
          const selectedOption = selectedElement.selectedOptions[0];
          const selectedText = selectedOption.textContent;

          updateManga({
            chapNumber: getChapterNumber(toDataString(selectedText)),
          })
        }
      }
    }

    observer.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    updateManga({
      title: toDataString(nameElements[1].textContent),
    })

  }
  async getMangaOnList() {
    updateManga({
      title: toDataString(document.querySelector('h1 > p')?.textContent)
    })

    await CacheMangaApi()

    if (isMangaSameName()) {
      await delay(3000);
      const listItems = Array.from(document.querySelectorAll('.list_chapter > table > tbody tr'));
      handleChapterJump(listItems);
    }
  };

  blockAds(): void {
    removeElements('.pr_module');
    removeElements('img[src*="cmangapi"]')
    removeCookie('ads_num')
  }
}
