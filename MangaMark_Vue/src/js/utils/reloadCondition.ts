import { CachedValue } from "webext-storage-cache";
import isMatchingPattern from "./isMatchingPattern";
import isListMatchingPattern from "./isListMatchingPattern";
import delay from "./delay";

interface IReload {
  isReloadList: boolean;
  isReloadRead: boolean;
}

let initReload: IReload = {
  isReloadList: false,
  isReloadRead: false
}

const updateReload = (...rest: Partial<IReload>[]) => {
  initReload = Object.assign(initReload, ...rest);
}
// omegascans is SPA, so we need to reload the page to get the script running
export default async function reloadCondition() {
  const location = window.location
  const url = location.href
  if (url.includes('omegascans')) {
    const cacheReload = new CachedValue('Reload', { maxAge: { minutes: 5 } });

    cacheReload.isCached().then(async (isCached) => {
      if (!isCached) {
        await cacheReload.set(JSON.stringify(initReload));
        return;
      }

      updateReload(JSON.parse(await cacheReload.get() as string));

      if (location.pathname === '/') {
        document.querySelector('#update-chapter')?.remove();
        updateReload({ isReloadList: true, isReloadRead: true });
        await cacheReload.set(JSON.stringify(initReload));
      }

      if (initReload.isReloadList && isListMatchingPattern(url)) {
        updateReload({ isReloadList: false, isReloadRead: true });
        await cacheReload.set(JSON.stringify(initReload));
        await delay(1000);
        location.reload();
      }

      if (initReload.isReloadRead && isMatchingPattern(url)) {
        updateReload({ isReloadList: true, isReloadRead: false });
        await cacheReload.set(JSON.stringify(initReload));
        await delay(1000);
        location.reload();
      }
    });
  }
}
