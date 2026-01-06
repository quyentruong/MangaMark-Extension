import { describe, it, expect } from 'vitest';
import TruyenqqWebsite from "../src/js/website/truyenqqWebsite";
import getDocumentFromURL from './helper';

describe('Truyenqq', async () => {
  const title = "Thất Hình Đại Tội"
  describe('getMangaOnRead', async () => {
    const url = 'https://truyenqqviet.com/truyen-tranh/that-hinh-dai-toi-740-chap-346.html';
    const document = await getDocumentFromURL(url);
    const temp = new TruyenqqWebsite().getMangaOnRead(document);

    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter number', () => {
      expect(temp.chapNumber).toBe("346");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://truyenqqviet.com/truyen-tranh/that-hinh-dai-toi-740';
    const document = await getDocumentFromURL(url);
    const temp = await new TruyenqqWebsite().getMangaOnList(document, true);
    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter List', () => {
      expect(temp.listSize).gt(300);
    })
  })
});

describe('Phetruyen', async () => {
  const title = 'Tinh Giáp Hồn Tướng';
  describe('getMangaOnRead', async () => {
    const url = 'https://phetruyen.vip/tinh-giap-hon-tuong/chapter-88';
    const document = await getDocumentFromURL(url);
    const temp = new TruyenqqWebsite().getMangaOnRead(document);

    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter number', () => {
      expect(temp.chapNumber).toBe("88");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://phetruyen.vip/tinh-giap-hon-tuong';
    const document = await getDocumentFromURL(url);
    const temp = await new TruyenqqWebsite().getMangaOnList(document, true);
    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter List', () => {
      expect(temp.listSize).gt(150);
    })
  })
});
