import { describe, it, expect } from 'vitest';
import VlogtruyenWebsite from "../src/js/website/vlogtruyenWebsite";
import getDocumentFromURL from './helper';

describe('VlogTruyen', async () => {
  const title = "Tinh Thần Đại Hải Của Học Bá";
  describe('getMangaOnRead', async () => {
    const url = 'https://vlogtruyen15.com/tinh-than-dai-hai-cua-hoc-ba/chapter-188-65a725e7006d67468f1eca92.html';
    const document = await getDocumentFromURL(url);
    const temp = new VlogtruyenWebsite().getMangaOnRead(document);

    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter number', () => {
      expect(temp.chapNumber).toBe("188");
    })
  })
});

