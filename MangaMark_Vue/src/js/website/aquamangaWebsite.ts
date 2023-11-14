import { initManga, isMangaSameName } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class AqumangaWebsite implements Website {
  name = 'aqumanga';
  getMangaOnRead() {
    let fTitleChapter = document.querySelector<HTMLElement>("#chapter-heading").innerText.split("-");

    initManga.chapNumber = getChapterNumber(fTitleChapter[1]);
    initManga.title = fTitleChapter[0].trim();
  }
  async getMangaOnList() {
    initManga.title = document.querySelector<HTMLElement>('h1').innerHTML.trim();
    await CacheMangaApi();
    if (isMangaSameName) {
      const list = document.querySelector('.c-page')
      const observer = new MutationObserver(callback)
      observer.observe(list, {
        childList: true,
        subtree: true,
        characterData: true,
      });

    }
  }

  blockAds(): void {

  }
}

function callback(mutations: MutationRecord[]): void {
  const mangaChapterHolder = document.querySelector('div#manga-chapters-holder');
  const activeListItem = document.querySelector('li.parent.has-child.active');

  if (mangaChapterHolder) {
    const list = mangaChapterHolder.querySelector('ul');
    const listItems = Array.from(list.querySelectorAll('li'));
    handleChapterJump(listItems);
  }

  if (activeListItem) {
    const list = activeListItem.querySelector('ul');
    const listItems = Array.from(list.querySelectorAll('li.wp-manga-chapter'));

    handleChapterJump(listItems);
  }
}
