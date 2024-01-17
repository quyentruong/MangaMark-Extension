import { describe, it, expect } from 'vitest';
import AqumangaWebsite from "../src/js/website/aquamangaWebsite";
import getDocumentFromURL from './helper';

describe('AquaManga', async () => {
  const title = "Cultivation Chat Group";
  describe('getMangaOnRead', async () => {
    const url = 'https://aquamanga.org/manga/cultivation-chat-group/cultivation-chat-group/chapter-295/';
    const document = await getDocumentFromURL(url);
    const temp = new AqumangaWebsite().getMangaOnRead(document);

    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter number', () => {
      expect(temp.chapNumber).toBe("295");
    })
  })
});

