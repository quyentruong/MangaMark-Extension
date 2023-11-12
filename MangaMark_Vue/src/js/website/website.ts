import { Manga, MangaApi } from "../types/manga";

export default interface Website {
  name: string;
  getMangaOnRead: () => Manga;
  getMangaOnList: () => void;
  blockAds: () => void;
}
