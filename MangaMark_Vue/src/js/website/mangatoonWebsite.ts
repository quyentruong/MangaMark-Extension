import { Manga, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";

export default class MangatoonWebsite implements Website {
  name = 'mangatoon';
  getMangaOnRead(): Manga {
    const result = { ...initManga };

    let fWatchPage = document.querySelector<HTMLElement>("#app");
    const observer = new MutationObserver(callback)
    function callback(mutations: MutationRecord[]): void {
      for (let mutation of mutations) {

        if (mutation.target === document.querySelector('div.watch-page')) {
          document.getElementById("update-chapter").style.display = "revert";
        } else if (mutation.target === document.querySelector('div.detail-list')) {
          document.getElementById("update-chapter").style.display = "none";
        } else if (mutation.target instanceof Text) {
          result.chapNumber = getChapterNumber(mutations[0].target.textContent);
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
    result.title = url.split("/").slice(0, 4).join("/");
    return result;
  };
  getMangaOnList(): Manga {
    return null
  }

  blockAds(): void {

  }
}
