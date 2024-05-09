import { isMangaSameName, updateManga } from "../types/manga";
import CacheMangaApi from "../utils/cacheMangaApi";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import toDataString from "../utils/toDataString";
import Website from "./website";

export default class AqumangaWebsite implements Website {
  name = 'aqumanga';
  getMangaOnRead(document: Document = window.document) {
    let fTitleChapter = toDataString(document.querySelector<HTMLElement>("#chapter-heading")).split("-");
    const temp = {
      title: toDataString(fTitleChapter[0]),
      chapNumber: getChapterNumber(fTitleChapter[1])
    }
    updateManga({
      ...temp
    })
    return {
      ...temp
    }
  }
  async getMangaOnList() {
    console.log('getMangaOnList')
    updateManga({
      title: toDataString(document.querySelector<HTMLElement>('h1')),
    })
    await CacheMangaApi();
    if (isMangaSameName()) {
      const list = document.querySelector('.c-page') as HTMLElement
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
    const list = mangaChapterHolder.querySelector('ul') as Element;
    const listItems = Array.from(list.querySelectorAll('li'));
    handleChapterJump(listItems);
  }

  if (activeListItem) {
    const list = activeListItem.querySelector('ul') as Element;
    const listItems = Array.from(list.querySelectorAll('li.wp-manga-chapter'));

    handleChapterJump(listItems);
  }
}
