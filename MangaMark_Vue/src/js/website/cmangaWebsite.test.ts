import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CmangaWebsite from './cmangaWebsite';
import * as mangaModule from '../types/manga';
import * as cacheMangaApiModule from '../utils/cacheMangaApi';

describe('CmangaWebsite', () => {
    let querySelectorAllSpy: any;
    let getElementByIdSpy: any;
    let querySelectorSpy: any;
    let updateMangaSpy: any;
    let cacheMangaApiSpy: any;
    let mutationObserverBackup: any;
    let isMangaSameNameSpy: any;

    beforeEach(() => {
        vi.restoreAllMocks();
        if (mutationObserverBackup) {
            window.MutationObserver = mutationObserverBackup;
        }
    });

    afterEach(() => {
        if (querySelectorAllSpy) querySelectorAllSpy.mockRestore();
        if (getElementByIdSpy) getElementByIdSpy.mockRestore();
        if (querySelectorSpy) querySelectorSpy.mockRestore();
        if (updateMangaSpy) updateMangaSpy.mockRestore();
        if (cacheMangaApiSpy) cacheMangaApiSpy.mockRestore();
        if (isMangaSameNameSpy) isMangaSameNameSpy.mockRestore();
    });

    it('should update manga title on getMangaOnRead', () => {
        // Mock MutationObserver to avoid DOM errors
        mutationObserverBackup = window.MutationObserver;
        class DummyObserver {
            observe() { }
            disconnect() { }
            takeRecords() { return []; }
        }
        // @ts-ignore
        window.MutationObserver = DummyObserver;
        const nameElements = [
            { textContent: 'ignore' },
            { textContent: 'Test Manga Title' }
        ];
        querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue(nameElements as any);
        // Return a real Node for getElementById
        const div = document.createElement('div');
        getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(div);
        updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());

        const cmanga = new CmangaWebsite();
        cmanga.getMangaOnRead();
        expect(updateMangaSpy).toHaveBeenCalledWith({ title: 'Test Manga Title' });
    });

    it('should update manga title on getMangaOnList', async () => {
        querySelectorSpy = vi.spyOn(document, 'querySelector').mockImplementation((selector: string) => {
            if (selector === 'h1 > p') {
                return { textContent: 'List Manga Title' } as any;
            }
            return null;
        });
        updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());
        cacheMangaApiSpy = vi.spyOn(cacheMangaApiModule, 'default').mockResolvedValue(undefined);
        isMangaSameNameSpy = vi.spyOn(mangaModule, 'isMangaSameName').mockReturnValue(false);

        const cmanga = new CmangaWebsite();
        await cmanga.getMangaOnList();
        expect(updateMangaSpy).toHaveBeenCalledWith({ title: 'List Manga Title' });
    });
});
