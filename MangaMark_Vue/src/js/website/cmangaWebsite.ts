import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import clickElements from "../utils/clickElements";
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
        const imgTags = Array.from(document.querySelectorAll(".chapter_content img")) as HTMLImageElement[];
        for (let imgTag of imgTags) {
          imgTag.style.width = "100vw";
        }
        const selectedElement = document.querySelector('.chapter_list') as HTMLSelectElement;
        if (mutation.target === selectedElement) {
          const selectedOption = selectedElement.selectedOptions[0];
          const selectedText = selectedOption.textContent;

          removeElements('div.chapter_ad_block')
          removeElements('div.chapter_content', 'style')
          removeElements('.pr_module')
          removeElements('img[src*="cmangapi"]')

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
    clickElements('div.nav_menu_outside.mini_button')
    removeElements('div#popup_content')
    removeElements('div.other_list')
    removeCookie('ads_num')
    removeCookie('adsView')
  }
}
