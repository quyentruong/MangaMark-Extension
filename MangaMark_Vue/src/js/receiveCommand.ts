import Swal from "sweetalert2";
import { initManga, initMangaApi } from "./types/manga";
import { packageName } from "./global";
import shaking from "./utils/shaking";
import { updateBtn } from "./setupButton";
import logWithTimestamp from "./utils/logWithTimestamp";
import toDataString from "./utils/toDataString";

export default function receiveCommand() {
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.command === "updateChapter") {
      if (parseFloat(initMangaApi.quantity) < parseFloat(toDataString(initManga.chapNumber))) {
        Swal.fire({
          title: packageName,
          text: `Do you want to update chapter to ${initManga.chapNumber}?`,
          icon: "info",
          confirmButtonText: "Yes",
          showCancelButton: true,
          cancelButtonText: "No",
          allowOutsideClick: shaking,
          backdrop: true
        })
          .then(willUpdate => {
            if (willUpdate.isConfirmed) {
              updateBtn();
            } else {
              logWithTimestamp(`User canceled update chapter ${initManga.chapNumber}`);
            }
          }).finally(() => {
            chrome.runtime.sendMessage({ command: 'startAlarm' });
          });
      }
    } else if (message.command === "showAbout") {
      Swal.fire({
        title: packageName,
        html: `<a href="https://github.com/">Version:</a> ${chrome.runtime.getManifest().version}`,
        icon: "info",
        confirmButtonText: "OK",
        allowOutsideClick: shaking,
        backdrop: true
      })
    } else if (message.command === "receiveMessage") {
      logWithTimestamp(message.message);
    }
  });
}

