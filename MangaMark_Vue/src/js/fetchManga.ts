import { Manga, MangaApi } from "./types/manga";
import "animate.css"
import Swal from 'sweetalert2'
import shaking from "./utils/shaking";
import { apiWebsite } from "./global";
import ClipboardJS from "clipboard";

/**
 * Fetches manga data from the API.
 *
 * @param {Manga} manga - The manga object to fetch data for.
 * @return {Promise<MangaApi>} A promise that resolves to the manga data retrieved from the API.
 */
export default async function fetchManga(manga: Manga, isList: boolean = false): Promise<MangaApi> {
  let result = null;
  const storage = await chrome.storage.sync.get(["ID", "API"])
  const urlApi = `${apiWebsite}/api/getinfomanga`;

  const dataToSend = new URLSearchParams({
    user_id: storage.ID,
    manga_name: manga.title,
    api: storage.API,
  });

  const response = await fetch(`${urlApi}?${dataToSend}`);
  const { data } = await response.json() as { data: MangaApi };
  const { status } = response;
  if (status === 404) {
    Swal.fire({
      title: "Manga Mark",
      text: `Please add ${manga.title} to your account. When you click Go to website, the title will be copied to your clipboard.`,
      icon: "error",
      confirmButtonText: "Go to website",
      showCancelButton: true,
      allowOutsideClick: shaking,
      backdrop: true
    })
      .then(gowebsite => {
        if (gowebsite.isConfirmed) {
          ClipboardJS.copy(manga.title);
          window.open(apiWebsite, '_blank').focus();
        }
      });
  } else if (status === 500 || status === 302) {
    Swal.fire({
      title: "Manga Mark",
      text: `ID or API Key is incorrect. Please check your setting in extension.`,
      icon: "error",
      allowOutsideClick: shaking,
      backdrop: true
    });
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text: 'Manga Mark is working correctly',
      showConfirmButton: false,
      timer: 2000,
      toast: true
    });
    if (!isList) {
      document.getElementById("update-chapter").innerText = data.quantity;
    }

    result = { ...data };
  }
  return result;
}
