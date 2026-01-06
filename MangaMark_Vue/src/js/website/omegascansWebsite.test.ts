import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import OmegascansWebsite from './omegascansWebsite';
import * as mangaModule from '../types/manga';
import * as cacheMangaApiModule from '../utils/cacheMangaApi';

describe('OmegascansWebsite', () => {
  let querySelectorSpy: any;
  let querySelectorAllSpy: any;
  let getElementByIdSpy: any;
  let updateMangaSpy: any;
  let cacheMangaApiSpy: any;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (querySelectorSpy) querySelectorSpy.mockRestore();
    if (querySelectorAllSpy) querySelectorAllSpy.mockRestore();
    if (getElementByIdSpy) getElementByIdSpy.mockRestore();
    if (updateMangaSpy) updateMangaSpy.mockRestore();
    if (cacheMangaApiSpy) cacheMangaApiSpy.mockRestore();
  });

  it('should update manga title on getMangaOnRead', () => {
    // Mock MutationObserver
    const mutationObserverBackup = window.MutationObserver;
    class DummyObserver {
      observe() {}
      disconnect() {}
      takeRecords() { return []; }
    }
    // @ts-ignore
    window.MutationObserver = DummyObserver;
    getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'));
    querySelectorSpy = vi.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
      if (selector === 'h2') return { innerText: 'Manga Title' } as any;
      return null;
    });
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());

    const omega = new OmegascansWebsite();
    omega.getMangaOnRead();
    expect(updateMangaSpy).toHaveBeenCalledWith({ title: 'Manga Title' });
    window.MutationObserver = mutationObserverBackup;
  });

  it('should update manga title on getMangaOnList', async () => {
    // Mock MutationObserver
    const mutationObserverBackup = window.MutationObserver;
    class DummyObserver {
      observe() {}
      disconnect() {}
      takeRecords() { return []; }
    }
    // @ts-ignore
    window.MutationObserver = DummyObserver;
    getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'));
    querySelectorSpy = vi.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
      if (selector === 'h1') return { innerText: 'List Manga Title' } as any;
      return null;
    });
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());
    cacheMangaApiSpy = vi.spyOn(cacheMangaApiModule, 'default').mockResolvedValue(undefined);

    const omega = new OmegascansWebsite();
    await omega.getMangaOnList();
    expect(updateMangaSpy).toHaveBeenCalledWith({ title: 'List Manga Title' });
    window.MutationObserver = mutationObserverBackup;
  });
});
