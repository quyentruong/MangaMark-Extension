import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";

export default class MangatoonWebsite implements Website {
  name = 'mangatoon';
  getMangaOnRead() {
    let fWatchPage = document.querySelector<HTMLElement>("#app");
    const observer = new MutationObserver(callback)
    function callback(mutations: MutationRecord[]): void {
      for (let mutation of mutations) {

        if (mutation.target === document.querySelector('div.watch-page')) {
          document.getElementById("update-chapter").style.display = "revert";
        } else if (mutation.target === document.querySelector('div.detail-list')) {
          document.getElementById("update-chapter").style.display = "none";
        } else if (mutation.target instanceof Text) {
          initManga.chapNumber = getChapterNumber(mutations[0].target.textContent);
          chrome.runtime.sendMessage({ command: 'startAlarm' });
        }

      }
    }

    observer.observe(fWatchPage, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // observer.disconnect();

    const url = window.location.href.split("://")[1];
    initManga.title = url.split("/").slice(0, 4).join("/");
  };
  getMangaOnList(): Manga {
    // impossible for this website
    return null
  }

  blockAds(): void {

  }
}
