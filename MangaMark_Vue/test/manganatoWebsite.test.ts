import { describe, it, expect } from 'vitest';
import ManganatoWebsite from "../src/js/website/manganatoWebsite";
import getDocumentFromURL from './helper';

describe('MangaNato', async () => {
  const title = "Cultivation Chat Group";
  describe('getMangaOnRead', async () => {
    const url = 'https://chapmanganato.to/manga-bf978788/chapter-606';
    const document = await getDocumentFromURL(url);
    const temp = new ManganatoWebsite().getMangaOnRead(document);

    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter number', () => {
      expect(temp.chapNumber).toBe("606");
    })
  })

  describe('getMangaOnList', async () => {
    const url = 'https://chapmanganato.to/manga-bf978788';
    const document = await getDocumentFromURL(url);
    const temp = await new ManganatoWebsite().getMangaOnList(document, true);
    it('Manga title', () => {
      expect(temp.title).toBe(title);
    });
    it('Chapter List', () => {
      expect(temp.listSize).gt(600);
    })
  })
});
