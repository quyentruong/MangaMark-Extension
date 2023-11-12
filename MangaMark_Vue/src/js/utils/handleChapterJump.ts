import Swal from "sweetalert2";
import getChapterNumber from "./getChapterNumber";
import { packageName } from "../global";
import { MangaApi } from "../types/manga";

export default function handleChapterJump(a: HTMLElement, mangaApi: MangaApi) {
  if (getChapterNumber(a.textContent) == mangaApi.quantity) {
    Swal.fire({
      title: packageName,
      text: `Do you want to jump to chapter ${mangaApi.quantity}?`,
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
