import { describe, it, expect } from 'vitest';
import NettruyenWebsite from "../src/js/website/nettruyenWebsite";
import getDocumentFromURL from './helper';

describe('Nettruyen', async () => {
  const title = "Đại Quản Gia Là Ma Hoàng";
  describe('getMangaOnRead', async () => {
    const url = 'https://www.nettruyenclub.com/truyen-tranh/dai-quan-gia-la-ma-hoang/chap-495/1117221';
    const document = await getDocumentFromURL(url);
    const temp = new NettruyenWebsite().getMangaOnRead(document);

    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter number', () => {
      expect(temp.chapNumber).toBe("495");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://www.nettruyenclub.com/truyen-tranh/dai-quan-gia-la-ma-hoang-219482';
    const document = await getDocumentFromURL(url);
    const temp = await new NettruyenWebsite().getMangaOnList(document, true);
    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter List', () => {
      expect(temp.listSize).gt(400);
    })
  })
});

describe('NhatTruyen', async () => {
  const title = "Cường Giả Đến Từ Trại Tâm Thần";
  describe('getMangaOnRead', async () => {
    const url = 'https://nhattruyento.com/truyen-tranh/cuong-gia-den-tu-trai-tam-than/chap-226/1117470';
    const document = await getDocumentFromURL(url);
    const temp = new NettruyenWebsite().getMangaOnRead(document);
    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter number', () => {
      expect(temp.chapNumber).toBe("226");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://nhattruyento.com/truyen-tranh/cuong-gia-den-tu-trai-tam-than-42451';
    const document = await getDocumentFromURL(url);
    const temp = await new NettruyenWebsite().getMangaOnList(document, true);
    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter List', () => {
      expect(temp.listSize).gt(200);
    })
  })
});
