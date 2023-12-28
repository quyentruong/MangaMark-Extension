import { CachedValue } from "webext-storage-cache";
import { MangaApi, initManga, initMangaApi, isMangaSameName, updateMangaApi } from "../types/manga";
import fetchManga from "../fetchManga";
import logWithTimestamp from "./logWithTimestamp";
import { requestReCache } from "../global";
import { compress } from "./compress";
import { decompress } from "./decompress";
import { MangaApiArrayUtils } from "./mangaApiArrayUtils";
import { toDataString } from "./toDataString";

export default async function CacheMangaApi() {
  const cacheApi = new CachedValue('MangaApi', { maxAge: { minutes: 5 } });
  const getMangaApi = await cacheApi.get();
  let mangaApi: MangaApi | undefined;
  let temp: MangaApi | undefined;

  if (getMangaApi) {
    logWithTimestamp('cache found');
    let decompressed = JSON.parse(await decompress(getMangaApi as string, 'deflate-raw'));
    new MangaApiArrayUtils(decompressed as unknown as MangaApi[]);
    mangaApi = MangaApiArrayUtils.findObjectByName(toDataString(initManga.title));
    if (!isMangaSameName(initManga, mangaApi)) {
      logWithTimestamp('cache name not match');
      temp = await fetchManga();
    }
    else {
      logWithTimestamp('cache name match');
      if (requestReCache.value) {
        logWithTimestamp('cache request updated');
        // debugger
        temp = initMangaApi
        MangaApiArrayUtils.updateObjectByQuantity(initMangaApi);
        requestReCache.value = false
      }
    }

  } else {
    logWithTimestamp('cache not found');
    temp = await fetchManga();
  }

  if (temp) {
    MangaApiArrayUtils.addObject(temp);
    await cacheApi.set(await compress(JSON.stringify(MangaApiArrayUtils.getmangaApiArray()), 'deflate-raw'),);
    updateMangaApi(temp);
  } else {
    updateMangaApi(mangaApi);
  }
}
