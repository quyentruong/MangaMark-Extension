import Swal from "sweetalert2";
import { Manga, MangaApi } from "./types/manga";
import { packageName } from "./global";
import shaking from "./utils/shaking";
import { updateBtn } from "./setupButton";
import logWithTimestamp from "./utils/logWithTimestamp";

export default function receiveCommand(manga: Manga, mangaApi: MangaApi) {
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.command === "updateChapter") {
      if (parseFloat(mangaApi.quantity) < parseFloat(manga.chapNumber)) {
        Swal.fire({
          title: packageName,
          text: `Do you want to update chapter to ${manga.chapNumber}?`,
          icon: "info",
          confirmButtonText: "Yes",
          showCancelButton: true,
          cancelButtonText: "No",
          allowOutsideClick: shaking,
          backdrop: true
        })
          .then(willUpdate => {
            if (willUpdate.isConfirmed) {
              updateBtn(manga, mangaApi);
            } else {
              logWithTimestamp(`User canceled update chapter ${manga.chapNumber}`);
            }
          }).finally(() => {
            chrome.runtime.sendMessage({ command: 'startAlarm' });
          });
      }
    }
  });
}

