export interface Manga {
  title: string;
  chapNumber: string;
}

export const initManga: Manga = {
  title: "",
  chapNumber: ""
}

export interface MangaApi {
  id: number;
  name: string;
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

export const isMangaSameName: boolean = initMangaApi.name.localeCompare(initManga.title) === 0
