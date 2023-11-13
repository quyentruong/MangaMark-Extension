import { Manga } from "../types/manga";

export default interface Website {
  name: string;
  getMangaOnRead: () => void;
  getMangaOnList: () => void;
  blockAds: () => void;
}
