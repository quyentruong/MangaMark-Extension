import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ToptruyenWebsite from './toptruyenWebsite';
import * as mangaModule from '../types/manga';
import * as cacheMangaApiModule from '../utils/cacheMangaApi';

describe('ToptruyenWebsite', () => {
  let querySelectorAllSpy: any;
  let querySelectorSpy: any;
  let updateMangaSpy: any;
  let cacheMangaApiSpy: any;
  let isMangaSameNameSpy: any;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (querySelectorAllSpy) querySelectorAllSpy.mockRestore();
    if (querySelectorSpy) querySelectorSpy.mockRestore();
    if (updateMangaSpy) updateMangaSpy.mockRestore();
    if (cacheMangaApiSpy) cacheMangaApiSpy.mockRestore();
    if (isMangaSameNameSpy) isMangaSameNameSpy.mockRestore();
  });

  it('should update manga title and chapter on getMangaOnRead', () => {
    // Mock breadcrumb links with innerText for toDataString
    const breadcrumb = [
      { innerText: 'ignore' },
      { innerText: 'ignore' },
      { innerText: 'Manga Title' },
      { innerHTML: 'Chap 123' }
    ];
    querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockImplementation((selector: string) => {
      if (selector === ".list-image-detail .page-chapter img") return [];
      if (selector === "a[itemprop='item']") return breadcrumb as any;
      if (selector === ".breadcrumb > li > a") return [];
      return [];
    });
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());

    const toptruyen = new ToptruyenWebsite();
    toptruyen.getMangaOnRead();
    expect(updateMangaSpy).toHaveBeenCalledWith({
      title: 'Manga Title',
      chapNumber: '123',
    });
  });

  it('should update manga title on getMangaOnList', async () => {
    // Mock breadcrumb li structure
    const breadcrumbLis = [
      {},
      {},
      { querySelector: () => ({ textContent: 'List Manga Title' }) }
    ];
    querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockImplementation((selector: string) => {
      if (selector === 'ul.breadcrumb > li') return breadcrumbLis as any;
      if (selector === 'ol.breadcrumb > li') return [];
      if (selector === '#list-chapter-dt > nav > ul > li') return [];
      if (selector === '.works-chapter-list > div') return [];
      return [];
    });
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());
    cacheMangaApiSpy = vi.spyOn(cacheMangaApiModule, 'default').mockResolvedValue(undefined);
    isMangaSameNameSpy = vi.spyOn(mangaModule, 'isMangaSameName').mockReturnValue(false);

    const toptruyen = new ToptruyenWebsite();
    await toptruyen.getMangaOnList();
    expect(updateMangaSpy).toHaveBeenCalledWith({ title: 'List Manga Title' });
  });
});
