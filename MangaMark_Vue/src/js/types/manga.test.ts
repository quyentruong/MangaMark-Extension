// src/js/types/manga.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as mangaModule from './manga';
import toDataString from '../utils/toDataString';

vi.mock('../utils/toDataString', () => ({
  default: (s: string | null | undefined) => s ?? ''
}));

describe('manga.ts', () => {
  beforeEach(() => {
    mangaModule.initManga.title = null;
    mangaModule.initManga.chapNumber = "";
    mangaModule.initManga.listSize = 0;
    mangaModule.initMangaApi.id = 0;
    mangaModule.initMangaApi.name = "";
    mangaModule.initMangaApi.other_name_1 = null;
    mangaModule.initMangaApi.other_name_2 = null;
    mangaModule.initMangaApi.other_name_3 = null;
    mangaModule.initMangaApi.user_id = 0;
    mangaModule.initMangaApi.quantity = "";
    mangaModule.initMangaApi.created_at = "";
    mangaModule.initMangaApi.updated_at = "";
    mangaModule.mangaApiArray.length = 0;
  });

  it('initManga has correct default values', () => {
    expect(mangaModule.initManga).toEqual({
      title: null,
      chapNumber: "",
      listSize: 0
    });
  });

  it('initMangaApi has correct default values', () => {
    expect(mangaModule.initMangaApi).toEqual({
      id: 0,
      name: "",
      other_name_1: null,
      other_name_2: null,
      other_name_3: null,
      user_id: 0,
      quantity: "",
      created_at: "",
      updated_at: ""
    });
  });

  it('updateManga updates fields and title-cases the title', () => {
    mangaModule.updateManga({ title: 'test manga', chapNumber: '5', listSize: 10 });
    expect(mangaModule.initManga.title).toBe('Test Manga');
    expect(mangaModule.initManga.chapNumber).toBe('5');
    expect(mangaModule.initManga.listSize).toBe(10);
  });

  it('updateMangaApi updates fields', () => {
    mangaModule.updateMangaApi({ id: 42, name: 'Naruto', user_id: 7 });
    expect(mangaModule.initMangaApi.id).toBe(42);
    expect(mangaModule.initMangaApi.name).toBe('Naruto');
    expect(mangaModule.initMangaApi.user_id).toBe(7);
  });

  it('isMangaSameName returns true for matching names (case-insensitive)', () => {
    mangaModule.initManga.title = 'Naruto';
    mangaModule.initMangaApi.name = 'naruto';
    expect(mangaModule.isMangaSameName()).toBe(true);
  });

  it('isMangaSameName returns true for matching other names', () => {
    mangaModule.initManga.title = 'Bleach';
    mangaModule.initMangaApi.name = 'Naruto';
    mangaModule.initMangaApi.other_name_1 = 'bleach';
    expect(mangaModule.isMangaSameName()).toBe(true);
  });

  it('isMangaSameName returns false for non-matching names', () => {
    mangaModule.initManga.title = 'One Piece';
    mangaModule.initMangaApi.name = 'Naruto';
    mangaModule.initMangaApi.other_name_1 = 'Bleach';
    expect(mangaModule.isMangaSameName()).toBe(false);
  });

  it('isMangaSameName handles nulls', () => {
    mangaModule.initManga.title = 'Pokémon';
    mangaModule.initMangaApi.name = null;
    mangaModule.initMangaApi.other_name_1 = 'Pokémon';
    expect(mangaModule.isMangaSameName()).toBe(true);
  });

  it('mangaApiArray is an array and supports push', () => {
    expect(Array.isArray(mangaModule.mangaApiArray)).toBe(true);
    mangaModule.mangaApiArray.push({ ...mangaModule.initMangaApi, id: 1 });
    expect(mangaModule.mangaApiArray.length).toBe(1);
    expect(mangaModule.mangaApiArray[0].id).toBe(1);
  });
});