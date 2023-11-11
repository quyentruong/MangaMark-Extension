export interface Manga {
  title: string;
  chapNumber: string;
}

export const initManga: Manga = {
  title: "",
  chapNumber: "",
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

