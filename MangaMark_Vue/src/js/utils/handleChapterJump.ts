import Swal from "sweetalert2";
import getChapterNumber from "./getChapterNumber";
import { packageName } from "../global";
import { initMangaApi } from "../types/manga";
import toDataString from "./toDataString";

export default function handleChapterJump(listItems: Element[]) {
  let notFound = true
  const url = window.location.href
  let chapterNumber = '0'
  let linkJump: HTMLElement | null = null
  for (const li of listItems) {
    if (url.includes('omegascans')) {
      linkJump = li as HTMLElement
      chapterNumber = getChapterNumber(toDataString(li.querySelector('span')))
    } else {
      linkJump = li.querySelector<HTMLElement>('a')
      chapterNumber = getChapterNumber(toDataString(linkJump?.textContent))
    }
    showJumpAlert(chapterNumber, linkJump);
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

  function showJumpAlert(chapterNumber: string, linkJump: HTMLElement | null) {
    if (chapterNumber == initMangaApi.quantity) {
      chrome.storage.sync.set({ isFailLogin: false });
      notFound = false;
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
      }).then(async willUpdate => {
        if (willUpdate.isConfirmed && linkJump) {
          linkJump.click();
        }
      });
    }
  }
}
