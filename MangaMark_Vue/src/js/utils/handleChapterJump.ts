import Swal from "sweetalert2";
import getChapterNumber from "./getChapterNumber";
import { packageName } from "../global";
import { initMangaApi } from "../types/manga";

export default function handleChapterJump(listItems: Element[]) {
  let notFound = true
  for (const li of listItems) {
    const a = li.querySelector<HTMLElement>('a');
    if (getChapterNumber(a.textContent) == initMangaApi.quantity) {
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
          window.location.href = a.getAttribute('href');
        }
      })
    }
  }
  if (notFound) {
    Swal.fire({
      icon: 'error',
      text: `Chapter ${initMangaApi.quantity} not found!`,
      showConfirmButton: false,
      timer: 2000,
      toast: true
    })
  }

}
