import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TruyenqqWebsite from './truyenqqWebsite';
import * as mangaModule from '../types/manga';

describe('TruyenqqWebsite', () => {
  let querySelectorAllSpy: any;
  let querySelectorSpy: any;
  let updateMangaSpy: any;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (querySelectorAllSpy) querySelectorAllSpy.mockRestore();
    if (querySelectorSpy) querySelectorSpy.mockRestore();
    if (updateMangaSpy) updateMangaSpy.mockRestore();
  });

  it('should update manga title and chapter on getMangaOnRead', () => {
    // Mock span[itemprop='name']
    const spans = [
      {},
      { innerText: 'Manga Title' },
      { innerHTML: 'Chap 5' }
    ];
    querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockImplementation((selector: string) => {
      if (selector === 'img') return [];
      if (selector === "span[itemprop='name']") return spans as any;
      return [];
    });
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());

    const truyenqq = new TruyenqqWebsite();
    const result = truyenqq.getMangaOnRead(document);
    expect(updateMangaSpy).toHaveBeenCalledWith({ title: 'Manga Title', chapNumber: '5' });
    expect(result).toEqual({ title: 'Manga Title', chapNumber: '5' });
  });

  it('should update manga title and list size on getMangaOnList', async () => {
    // Mock works-chapter-item and h1
    const worksItems = [{}, {}, {}];
    querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockImplementation((selector: string) => {
      if (selector === 'div .works-chapter-item') return worksItems as any;
      return [];
    });
    querySelectorSpy = vi.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
      if (selector === 'h1') return { innerText: 'List Manga Title' } as any;
      return null;
    });
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());

    const truyenqq = new TruyenqqWebsite();
    const result = await truyenqq.getMangaOnList(document, true);
    expect(updateMangaSpy).toHaveBeenCalledWith({ title: 'List Manga Title', listSize: 3 });
    expect(result).toEqual({ title: 'List Manga Title', listSize: 3 });
  });
});
