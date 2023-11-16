import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import { toDataString } from "../utils/toDataString";
import Website from "./website";

export default class MangatoonWebsite implements Website {
  name = 'mangatoon';
  getMangaOnRead() {
    let fWatchPage = document.querySelector<HTMLElement>("#app") as HTMLElement;
    const observer = new MutationObserver(callback)
    function callback(mutations: MutationRecord[]): void {
      // console.log(mutations)
      const watchPageDiv = document.querySelector('div.watch-page');
      const detailListDiv = document.querySelector('div.detail-list');
      const updateChapterElement = document.getElementById("update-chapter");

      if (updateChapterElement === null) {
        return;
      }

      for (let mutation of mutations) {
        switch (mutation.target) {
          case watchPageDiv:
            updateChapterElement.style.display = "revert";
            break;
          case detailListDiv:
            // console.log(mutation)
            updateChapterElement.style.display = "none";
            break;
          default:
            if (mutation.target instanceof Text) {
              initManga.chapNumber = getChapterNumber(toDataString(mutation.target.textContent));
              chrome.runtime.sendMessage({ command: 'startAlarm' });
            }
            break;
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
  getMangaOnList() {
    // impossible for this website
    // return null
  }

  blockAds(): void {

  }
}
