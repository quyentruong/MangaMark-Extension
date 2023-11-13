import { CachedValue } from "webext-storage-cache";
import { MangaApi, initManga, initMangaApi, updateMangaApi } from "../types/manga";
import fetchManga from "../fetchManga";
import logWithTimestamp from "./logWithTimestamp";
import { requestReCache } from "../global";


export default async function CacheMangaApi() {
  const cacheApi = new CachedValue('MangaApi');
  const getMangaApi = await cacheApi.get();
  let temp: MangaApi | undefined;

  if (getMangaApi) {
    logWithTimestamp('cache found');
    const mangaApi = getMangaApi as unknown as MangaApi;
    if (mangaApi.name !== initManga.title) {
      logWithTimestamp('cache name not match');
      temp = await fetchManga();
    }
    else {
      if (requestReCache.value) {
        logWithTimestamp('cache request updated');
        temp = initMangaApi
        requestReCache.value = false
      }

    }

  } else {
    logWithTimestamp('cache not found');
    temp = await fetchManga();
  }

  if (temp) {
    await cacheApi.set({ ...temp });
    updateMangaApi(temp);
  } else {
    updateMangaApi(getMangaApi);
  }
}
