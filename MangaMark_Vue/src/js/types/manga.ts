import toDataString from "../utils/toDataString";

export interface Manga {
  title?: string | null;
  chapNumber?: string;
  listSize?: number;
}

export let initManga: Manga = {
  title: null,
  chapNumber: "",
  listSize: 0
}

export interface MangaApi {
  id: number;
  name: string | null;
  other_name_1: string | null;
  other_name_2: string | null;
  other_name_3: string | null;
  user_id: number;
  quantity: string;
  created_at: string;
  updated_at: string;
}

export let initMangaApi: MangaApi = {
  id: 0,
  name: "",
  other_name_1: null,
  other_name_2: null,
  other_name_3: null,
  user_id: 0,
  quantity: "",
  created_at: "",
  updated_at: ""
}

export const updateMangaApi = (...rest: Partial<MangaApi | undefined>[]) => {
  initMangaApi = Object.assign(initMangaApi, ...rest);
}

export const updateManga = (...rest: Partial<Manga>[]) => {
  initManga = Object.assign(initManga, ...rest);
  initManga.title = toTitleCase(initManga.title);
}

function toTitleCase(value: string | null | undefined): string {
  if (!value) return '';
  return value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

export const isMangaSameName = (manga: Manga = initManga, mangaApi: MangaApi = initMangaApi): boolean => {
  const { title } = manga;
  const { name, other_name_1, other_name_2, other_name_3 } = mangaApi;

  return [name, other_name_1, other_name_2, other_name_3].some((apiName) => title?.toLocaleLowerCase().localeCompare(toDataString(apiName?.toLocaleLowerCase())) === 0);
}

export const mangaApiArray: MangaApi[] = [];
