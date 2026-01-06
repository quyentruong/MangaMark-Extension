import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import VlogtruyenWebsite from './vlogtruyenWebsite';
import * as mangaModule from '../types/manga';
import * as cacheMangaApiModule from '../utils/cacheMangaApi';

describe('VlogtruyenWebsite', () => {
  let querySelectorSpy: any;
  let querySelectorAllSpy: any;
  let updateMangaSpy: any;
  let cacheMangaApiSpy: any;
  let isMangaSameNameSpy: any;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (querySelectorSpy) querySelectorSpy.mockRestore();
    if (querySelectorAllSpy) querySelectorAllSpy.mockRestore();
    if (updateMangaSpy) updateMangaSpy.mockRestore();
    if (cacheMangaApiSpy) cacheMangaApiSpy.mockRestore();
    if (isMangaSameNameSpy) isMangaSameNameSpy.mockRestore();
  });

  it('should update manga title and chapter on getMangaOnRead', () => {
    querySelectorSpy = vi.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
      if (selector === '.title-manga-read') {
        return { innerText: 'Manga Title: Chapter 10' } as any;
      }
      return null;
    });
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());

    const vlogtruyen = new VlogtruyenWebsite();
    const result = vlogtruyen.getMangaOnRead(document);
    expect(updateMangaSpy).toHaveBeenCalledWith({ title: 'Manga Title', chapNumber: '10' });
    expect(result).toEqual({ title: 'Manga Title', chapNumber: '10' });
  });

  it('should update manga title on getMangaOnList', async () => {
    querySelectorSpy = vi.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
      if (selector === '.title-commic-detail') {
        return { innerText: 'List Manga Title' } as any;
      }
      if (selector === '.ul-list-chaper-detail-commic') {
        return {} as any;
      }
      return null;
    });
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());
    cacheMangaApiSpy = vi.spyOn(cacheMangaApiModule, 'default').mockResolvedValue(undefined);
    isMangaSameNameSpy = vi.spyOn(mangaModule, 'isMangaSameName').mockReturnValue(false);

    const vlogtruyen = new VlogtruyenWebsite();
    await vlogtruyen.getMangaOnList();
    expect(updateMangaSpy).toHaveBeenCalledWith({ title: 'List Manga Title' });
  });
});
