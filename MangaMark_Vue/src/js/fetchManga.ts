import { MangaApi, initManga } from "./types/manga";
import Swal from 'sweetalert2'
import shaking from "./utils/shaking";
import { apiWebsite, packageName } from "./global";
import ClipboardJS from "clipboard";
import failLogin from "./utils/failLogin";
import delay from "./utils/delay";

/**
 * Fetches manga data from the API.
 *
 * @return {Promise<MangaApi>} A promise that resolves to the manga data retrieved from the API.
 */
export default async function fetchManga(): Promise<MangaApi> {
  let result = null;
  const storage = await chrome.storage.sync.get(["ID", "API"])
  const urlApi = `${apiWebsite}/api/getinfomanga`;

  const dataToSend = new URLSearchParams({
    user_id: storage.ID,
    manga_name: initManga.title,
    api: storage.API,
  });

  const response = await fetch(`${urlApi}?${dataToSend}`);
  const { data } = await response.json() as { data: MangaApi };
  const { status } = response;
  if (status === 404) {
    Swal.fire({
      title: packageName,
      text: `Please add ${initManga.title} to your account. When you click Go to website, the title will be copied to your clipboard.`,
      icon: "error",
      confirmButtonText: "Go to website",
      showCancelButton: true,
      allowOutsideClick: shaking,
      width: 400,
      backdrop: true
    })
      .then(gowebsite => {
        if (gowebsite.isConfirmed) {
          ClipboardJS.copy(initManga.title);
          window.open(apiWebsite, '_blank').focus();
        }
      });
  } else if (status === 500 || status === 302) {
    failLogin();
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text: `${packageName} loading manga data!`,
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      didOpen: () => {
        Swal.showLoading()
      }
    }).then(() => {
      chrome.storage.sync.set({
        isFailLogin: false,
      })
    });
    // await delay(1000);
    result = { ...data };
  }

  return result;
}
