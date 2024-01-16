import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import toDataString from "../src/js/utils/toDataString";
import getChapterNumber from "../src/js/utils/getChapterNumber";

async function getDocumentFromURL(url: string): Promise<Document> {
  const { window } = await JSDOM.fromURL(url);
  const { document } = window;
  return document;
}

describe('Nettruyen', async () => {
  describe('getMangaOnRead', async () => {
    const url = 'https://www.nettruyenclub.com/truyen-tranh/dai-quan-gia-la-ma-hoang/chap-495/1117221'; // Replace with the URL you want to test
    const document = await getDocumentFromURL(url);
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")
    it('Manga title', () => {
      expect(toDataString(fTitleChapter[2])).toBe("Đại Quản Gia Là Ma Hoàng");
    });
    it('Chapter number', () => {
      expect(getChapterNumber(fTitleChapter[3])).toBe("495");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://www.nettruyenclub.com/truyen-tranh/dai-quan-gia-la-ma-hoang-219482'; // Replace with the URL you want to test
    const document = await getDocumentFromURL(url);

    it('Manga title', () => {
      expect(toDataString(document.querySelector<HTMLElement>('.title-detail'))).toBe("Đại Quản Gia Là Ma Hoàng");
    });
    it('Chapter List', () => {
      expect(Array.from(document.querySelectorAll('#nt_listchapter > nav > ul > li')).length).gt(400);
    })
  })
});

describe('NhatTruyen', async () => {
  describe('getMangaOnRead', async () => {
    const url = 'https://nhattruyento.com/truyen-tranh/cuong-gia-den-tu-trai-tam-than/chap-226/1117470'; // Replace with the URL you want to test
    const document = await getDocumentFromURL(url);
    let fTitleChapter = document.querySelectorAll<HTMLElement>("span[itemprop='name']")
    it('Manga title', () => {
      expect(toDataString(fTitleChapter[2])).toBe("Cường Giả Đến Từ Trại Tâm Thần");
    });
    it('Chapter number', () => {
      expect(getChapterNumber(fTitleChapter[3])).toBe("226");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://nhattruyento.com/truyen-tranh/cuong-gia-den-tu-trai-tam-than-42451'; // Replace with the URL you want to test
    const document = await getDocumentFromURL(url);

    it('Manga title', () => {
      expect(toDataString(document.querySelector<HTMLElement>('.title-detail'))).toBe("Cường Giả Đến Từ Trại Tâm Thần");
    });
    it('Chapter List', () => {
      expect(Array.from(document.querySelectorAll('#nt_listchapter > nav > ul > li')).length).gt(200);
    })
  })
});
