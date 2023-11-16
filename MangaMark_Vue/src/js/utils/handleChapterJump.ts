import Swal from "sweetalert2";
import getChapterNumber from "./getChapterNumber";
import { packageName } from "../global";
import { initMangaApi } from "../types/manga";
import { toDataString } from "./toDataString";

export default function handleChapterJump(listItems: Element[]) {
  let notFound = true
  for (const li of listItems) {
    const a = li.querySelector<HTMLElement>('a');

    if (getChapterNumber(toDataString(a?.textContent)) == initMangaApi.quantity) {
      chrome.storage.sync.set({ isFailLogin: false });
      notFound = false
      Swal.fire({
        title: packageName,
        width: 350,
        html: `Do you want to jump to chapter ${initMangaApi.quantity}?<br>Last read: ${new Date(initMangaApi.updated_at).toLocaleString()}`,
        icon: "info",
        confirmButtonText: "Yes",
        showCancelButton: true,
        cancelButtonText: "No",
        allowOutsideClick: true,
        backdrop: true
      }).then(willUpdate => {
        if (willUpdate.isConfirmed) {
          window.location.href = toDataString(a?.getAttribute('href'));
        }
      })
    }
  }
  if (notFound) {
    if (initMangaApi.quantity !== undefined) {
      chrome.storage.sync.set({ isFailLogin: false });
      Swal.fire({
        icon: 'error',
        text: `Chapter ${initMangaApi.quantity} not found!`,
        showConfirmButton: false,
        timer: 2000,
        toast: true
      })
    }
  }

}
