import fetchManga from "../fetchManga";
import { Manga, MangaApi, initManga } from "../types/manga";
import getChapterNumber from "../utils/getChapterNumber";
import handleChapterJump from "../utils/handleChapterJump";
import Website from "./website";

export default class AqumangaWebsite implements Website {
  name = 'aqumanga';
  getMangaOnRead(): Manga {
    const result = { ...initManga };
    let fTitleChapter = document.querySelector<HTMLElement>("#chapter-heading").innerText.split("-");

    result.chapNumber = getChapterNumber(fTitleChapter[1]);
    result.title = fTitleChapter[0].trim();
    return result;
  }
  async getMangaOnList() {
    const result = { ...initManga };
    result.title = document.querySelector<HTMLElement>('h1').innerHTML.trim();
    console.log(result.title)
    const mangaApi = await fetchManga(result, true)
    if (mangaApi) {
      const list = document.querySelector('.c-page')
      const observer = new MutationObserver((mutations: MutationRecord[]) => {
        callback(mutations, mangaApi);
      });
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

function callback(mutations: MutationRecord[], mangaApi: MangaApi): void {
  const mangaChapterHolder = document.querySelector('div#manga-chapters-holder');
  const activeListItem = document.querySelector('li.parent.has-child.active');

  if (mangaChapterHolder) {
    const list = mangaChapterHolder.querySelector('ul');
    const listItems = list.querySelectorAll('li');

    for (let i = 0; i < listItems.length; i++) {
      const a = listItems[i].querySelector<HTMLElement>('a');
      handleChapterJump(a, mangaApi);
    }
  }

  if (activeListItem) {
    const list = activeListItem.querySelector('ul');
    const listItems = list.querySelectorAll('li.wp-manga-chapter');

    for (let i = 0; i < listItems.length; i++) {
      const a = listItems[i].querySelector<HTMLElement>('a');
      handleChapterJump(a, mangaApi);
    }
  }
}
