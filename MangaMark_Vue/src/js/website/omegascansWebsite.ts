import { isMangaSameName, updateManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import Website from "./website";
import handleChapterJump from "../utils/handleChapterJump";
import CacheMangaApi from "../utils/cacheMangaApi";
import toDataString from "../utils/toDataString";
import delay from "../utils/delay";

export default class OmegascansWebsite implements Website {
  name = "omegascans";
  getMangaOnRead() {

    const content = document.getElementById('content') as HTMLElement;
    const observer = new MutationObserver(callback)
    function callback(mutations: MutationRecord[]): void {
      if (window.location.pathname !== '/') {
        for (let mutation of mutations) {
          updateManga({
            chapNumber: getChapterNumber(toDataString(document.querySelector('h1'))),
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
      title: toDataString(document.querySelector("h2"))
    })

  }

  async getMangaOnList() {
    const content = document.getElementById('content') as HTMLElement;
    const observer = new MutationObserver(callback)
    async function callback(mutations: MutationRecord[]): Promise<void> {
      if (window.location.pathname !== '/') {
        for (let mutation of mutations) {
          const selectedElement = document.querySelector('div.space-y-4.py-5');
          if (mutation.target == selectedElement) {
            const listItems = Array.from(document.querySelectorAll('ul.grid.grid-cols-1.gap-y-3 > a'));
            updateManga({
              listSize: listItems.length
            })
            if (isMangaSameName()) {
              await delay(3000);
              handleChapterJump(listItems);
            }
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
      title: toDataString(document.querySelector<HTMLElement>('h1'))
    })

    await CacheMangaApi();
  }

  blockAds(): void {

  }

}
