import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LuottruyenWebsite from './luottruyenWebsite';
import * as mangaModule from '../types/manga';
import * as cacheMangaApiModule from '../utils/cacheMangaApi';

// Helper to mock DOM
function setDom(html: string) {
  document.body.innerHTML = html;
}

describe('LuottruyenWebsite', () => {
  let querySelectorAllSpy: any;
  let querySelectorSpy: any;
  let updateMangaSpy: any;
  let cacheMangaApiSpy: any;
  let isMangaSameNameSpy: any;
  let delaySpy: any;
  let handleChapterJumpSpy: any;

  beforeEach(() => {
    vi.restoreAllMocks();
    setDom('');
  });

  afterEach(() => {
    if (querySelectorAllSpy) querySelectorAllSpy.mockRestore();
    if (querySelectorSpy) querySelectorSpy.mockRestore();
    if (updateMangaSpy) updateMangaSpy.mockRestore();
    if (cacheMangaApiSpy) cacheMangaApiSpy.mockRestore();
    if (isMangaSameNameSpy) isMangaSameNameSpy.mockRestore();
    if (delaySpy) delaySpy.mockRestore();
    if (handleChapterJumpSpy) handleChapterJumpSpy.mockRestore();
  });

  it('should update manga title and chapter on getMangaOnRead', () => {
      // Mock toDataString and getChapterNumber to avoid undefined errors
      vi.mock('../utils/toDataString', () => ({ default: (el: any) => el?.textContent || '' }));
      vi.mock('../utils/getChapterNumber', () => ({ default: (el: any) => el?.textContent?.replace(/\D/g, '') || '' }));
    // Mock DOM for reading page
    setDom(`
      <div class="reading-detail">
        <div class="page-chapter">
          <img src="img1.jpg" />
        </div>
      </div>
      <a itemprop='item'>Manga Title</a>
      <a itemprop='item'>Chapter 1</a>
    `);
    // Provide static mock data to avoid recursion
    const mockImg = document.createElement('img');
    // Do not set style.position or style.width, let the code under test set them
    const mockTitle = document.createElement('a');
    mockTitle.setAttribute('itemprop', 'item');
    mockTitle.textContent = 'Manga Title';
    const mockChapter = document.createElement('a');
    mockChapter.setAttribute('itemprop', 'item');
    mockChapter.textContent = 'Chapter 1';
    querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockImplementation((selector: string) => {
      if (selector === ".reading-detail .page-chapter img") return [mockImg] as any;
      if (selector === "a[itemprop='item']") return [mockTitle, mockChapter] as any;
      return [];
    });
    // Ensure textContent is always defined for test elements
    mockTitle.textContent = mockTitle.textContent || '';
    mockChapter.textContent = mockChapter.textContent || '';
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());
    // getChapterNumber and toDataString are imported, but their logic is not tested here
    const luottruyen = new LuottruyenWebsite();
    luottruyen.getMangaOnRead();
    expect(updateMangaSpy).toHaveBeenCalledWith({
      title: 'Manga Title',
      chapNumber: expect.anything(),
    });
  });

  it('should update manga title on getMangaOnList', async () => {
    // Set up DOM so document.querySelector('.title-detail') returns a real element
    setDom(`<div class="title-detail">Test Manga</div><nav><ul id="nt_listchapter"><li>Chap 1</li></ul></nav>`);
    // No need to mock querySelector, let the real DOM handle it
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());
    cacheMangaApiSpy = vi.spyOn(cacheMangaApiModule, 'default').mockResolvedValue(undefined);
    isMangaSameNameSpy = vi.spyOn(mangaModule, 'isMangaSameName').mockReturnValue(false);
    const luottruyen = new LuottruyenWebsite();
    await luottruyen.getMangaOnList();
    expect(updateMangaSpy).toHaveBeenCalledWith({ title: 'Test Manga' });
  });

  it('should call handleChapterJump if isMangaSameName is true', async () => {
    // Set up DOM so document.querySelector('.title-detail') returns a real element
    setDom(`<div class="title-detail">Test Manga</div><nav><ul id="nt_listchapter"><li>Chap 1</li></ul></nav>`);
    // No need to mock querySelector, let the real DOM handle it
    const mockLi = document.createElement('li');
    querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockImplementation((selector: string) => {
      if (selector === '#nt_listchapter > nav > ul > li') return [mockLi] as any;
      return [];
    });
    updateMangaSpy = vi.spyOn(mangaModule, 'updateManga').mockImplementation(vi.fn());
    cacheMangaApiSpy = vi.spyOn(cacheMangaApiModule, 'default').mockResolvedValue(undefined);
    isMangaSameNameSpy = vi.spyOn(mangaModule, 'isMangaSameName').mockReturnValue(true);
    delaySpy = vi.spyOn(await import('../utils/delay'), 'default').mockResolvedValue(undefined);
    handleChapterJumpSpy = vi.spyOn(await import('../utils/handleChapterJump'), 'default').mockImplementation(vi.fn());
    const luottruyen = new LuottruyenWebsite();
    await luottruyen.getMangaOnList();
    expect(handleChapterJumpSpy).toHaveBeenCalled();
  });
});
