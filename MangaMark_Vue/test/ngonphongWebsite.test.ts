import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import toDataString from "../src/js/utils/toDataString";
import getChapterNumber from "../src/js/utils/getChapterNumber";

async function getDocumentFromURL(url: string): Promise<Document> {
  const { window } = await JSDOM.fromURL(url);
  const { document } = window;
  return document;
}

describe('Ngonphong', async () => {
  describe('getMangaOnRead', async () => {
    const url = 'https://www.ngonphong.com/so-tay-nuoi-duong-rong-chap-108/'; // Replace with the URL you want to test
    const document = await getDocumentFromURL(url);
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")
    it('Manga title', () => {
      expect(toDataString(fTitleChapter[2])).toBe("Sổ Tay Nuôi Dưỡng Rồng");
    });
    it('Chapter number', () => {
      expect(getChapterNumber(fTitleChapter[3])).toBe("108");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://www.ngonphong.com/truyen-tranh/so-tay-nuoi-duong-rong/'; // Replace with the URL you want to test
    const document = await getDocumentFromURL(url);

    it('Manga title', () => {
      expect(toDataString(document.querySelector<HTMLElement>('.info-title'))).toBe("Sổ Tay Nuôi Dưỡng Rồng");
    });
    it('Chapter List', () => {
      expect(Array.from(document.querySelectorAll('.table > tbody > tr')).length).gt(100);
    })
  })
});

describe('a3manga', async () => {
  describe('getMangaOnRead', async () => {
    const url = 'https://www.a3manga.online/thi-hon-lao-cong-can-giup-suc-chap-637/'; // Replace with the URL you want to test
    const document = await getDocumentFromURL(url);
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")
    it('Manga title', () => {
      expect(toDataString(fTitleChapter[2])).toBe("Thí Hôn Lão Công, Cần Giúp Sức");
    });
    it('Chapter number', () => {
      expect(getChapterNumber(fTitleChapter[3])).toBe("637");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://www.a3manga.online/truyen-tranh/thi-hon-lao-cong-can-giup-suc/'; // Replace with the URL you want to test
    const document = await getDocumentFromURL(url);

    it('Manga title', () => {
      expect(toDataString(document.querySelector<HTMLElement>('.info-title'))).toBe("Thí Hôn Lão Công, Cần Giúp Sức");
    });
    it('Chapter List', () => {
      expect(Array.from(document.querySelectorAll('.table > tbody > tr')).length).gt(600);
    })
  })
});
