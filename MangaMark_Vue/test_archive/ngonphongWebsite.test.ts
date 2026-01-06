import { describe, it, expect } from 'vitest';
import getDocumentFromURL from './helper';
import NgonphongWebsite from "../src/js/website/ngonphongWebsite";

describe('Ngonphong', async () => {
  const title = "Sổ Tay Nuôi Dưỡng Rồng";
  describe('getMangaOnRead', async () => {
    const url = 'https://www.ngonphong.com/so-tay-nuoi-duong-rong-chap-108/';
    const document = await getDocumentFromURL(url);
    const temp = new NgonphongWebsite().getMangaOnRead(document);
    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter number', () => {
      expect(temp.chapNumber).toBe("108");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://www.ngonphong.com/truyen-tranh/so-tay-nuoi-duong-rong/';
    const document = await getDocumentFromURL(url);
    const temp = await new NgonphongWebsite().getMangaOnList(document, true);
    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter List', () => {
      expect(temp.listSize).gt(100);
    })
  })
});

describe('a3manga', async () => {
  const title = "Thí Hôn Lão Công, Cần Giúp Sức";
  describe('getMangaOnRead', async () => {
    const url = 'https://www.a3manga.online/thi-hon-lao-cong-can-giup-suc-chap-637/';
    const document = await getDocumentFromURL(url);
    const temp = new NgonphongWebsite().getMangaOnRead(document);
    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter number', () => {
      expect(temp.chapNumber).toBe("637");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://www.a3manga.online/truyen-tranh/thi-hon-lao-cong-can-giup-suc/';
    const document = await getDocumentFromURL(url);
    const temp = await new NgonphongWebsite().getMangaOnList(document, true);
    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter List', () => {
      expect(temp.listSize).gt(600);
    })
  })
});
