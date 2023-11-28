import { toDataString } from "../utils/toDataString";

export interface Manga {
  title: string | null;
  chapNumber: string;
}

export let initManga: Manga = {
  title: null,
  chapNumber: ""
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

export const updateMangaApi = (mangaApi: unknown) => {
  const temp = mangaApi as MangaApi;
  initMangaApi = { ...temp };
}

export const updateManga = (...rest: Partial<Manga>[]) => {
  initManga = Object.assign(initManga, ...rest);
}

export const isMangaSameName = (manga: Manga = initManga, mangaApi: MangaApi = initMangaApi): boolean => {
  const { title } = manga;
  const { name, other_name_1, other_name_2, other_name_3 } = mangaApi;

  return [name, other_name_1, other_name_2, other_name_3].some((apiName) => title?.toLocaleLowerCase().localeCompare(toDataString(apiName?.toLocaleLowerCase())) === 0);
}

export const mangaApiArray: MangaApi[] = [];
