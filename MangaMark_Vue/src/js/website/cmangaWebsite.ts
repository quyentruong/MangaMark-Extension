import { isMangaSameName, updateManga } from "../types/manga";
import addCookie from "../utils/addCookie";
import CacheMangaApi from "../utils/cacheMangaApi";
import clickElements from "../utils/clickElements";
import { decompress } from "../utils/decompress";
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

  async blockAds() {
    clickElements('div.nav_menu_outside.mini_button')
    removeElements('div#popup_content')
    removeElements('div.other_list')
    removeCookie('ads_num')
    removeCookie('adsView')

    const storage = await chrome.storage.sync.get(["ID", "API"])
    if (storage.ID == 1) {
      addCookie('login_email', 'token_login', 365)
      addCookie('login_password', await decompress('eJxFkklyW0cQRE/z9901di35AQ6yzLAoGHZQu+rqakkmRUIwx9s7sJEPkC/jZeSi6wIQ3w/f8viUb08LwIJnC4A8HT8d71w352e+VcKbBdZ197Db/n319fIzXv354RVLYcbzl4sPN/q6y7vbx8MCq6+qfn24eP92+dsC6+6Pq7qZx3x83n/e/Hh9084TVji+f2m6wPp4DezSFt4scEG63ezP3u+PD75ZYE36ufm4vX04l+evn96v93SnZ7G/x93N5exf/nl+/HjIF15gvbj9ef+7/Pjr8vz17WZ32C+4PXnAZgH4/vJLyWR6B/OBYb01RGPBMrI7B3iOX5l//f7/IZSntzbKwG5ZNaFCk5KJjVvjTC0zFdi4RvTaEBWoJEtrIrVodI1ka10gKjaeg90yo9buEyaBq1J3ou7F0kRA6mxElohBmDw0CthIlB7gHYEJmXq3cGfH7mbTZkJHml7VVL3NTB6SXDXIG43mtc1BQuR2YgGhTGIe3bvWFqppWE96bRjYjEF9AobpGDkhIruWwdY9gAGnxCDvENj7QJZgiupOpAVqmV6S22iZOk3ErOtUYwY4tWFOmzLEB4dU8tprZESdRQubwqzoiDo7jDZqNe6Uo1aBZjJmBQevElS9M0S3OholEIUgWRZKFZqsJtUyRzQqPUK0Up8+Rh8OwxnRvFOwQAwQDctsIIAZM8M9GjaSRl14IJyOoNv/APFp5K0=', 'deflate'), 365)
    }
  }
}
