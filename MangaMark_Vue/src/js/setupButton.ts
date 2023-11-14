import { MangaApi, initManga, initMangaApi, updateMangaApi } from "./types/manga";
import Swal from 'sweetalert2'
import shaking from "./utils/shaking";
import { apiWebsite, packageName, requestReCache } from "./global";
import CacheMangaApi from "./utils/cacheMangaApi";
import failLogin from "./utils/failLogin";

function initUpdateBtn() {
  let button = document.createElement("button");
  button.innerText = "Error";
  chrome.storage.sync.get(["POSITION"], (result) => {
    button.id = "update-chapter";
    const classes = ["custom-btn", "circle-btn"];

    if (result.POSITION) {
      classes.push(result.POSITION);
    } else {
      classes.push("top_left");
    }

    button.classList.add(...classes);
  });
  document.body.appendChild(button);
}

async function updateBtn() {
  async function updateChapter() {
    const response = await fetch(`${urlApi}?${new URLSearchParams(dataToSend)}`, {
      method: 'PUT'
    })
    const { data } = await response.json() as { data: MangaApi };
    const { status } = response;
    if (status === 500 || status === 302) {
      failLogin();
    } else {
      chrome.storage.sync.set({ isFailLogin: false });
      document.getElementById("update-chapter").innerText = data.quantity;
      updateMangaApi(data);
      requestReCache.value = true;
      await CacheMangaApi();
    }
  }

  const urlApi = `${apiWebsite}/api/updatemanga`;
  const storage = await chrome.storage.sync.get(["ID", "API"])
  const dataToSend = {
    user_id: storage.ID,
    chap_number: initManga.chapNumber,
    manga_name: initManga.title,
    api: storage.API
  };
  if (parseFloat(initMangaApi.quantity) < parseFloat(initManga.chapNumber)) {
    await updateChapter();
  } else if (parseFloat(initMangaApi.quantity) > parseFloat(initManga.chapNumber)) {
    Swal.fire({
      title: packageName,
      text: `Are you sure to update this chapter ${initManga.chapNumber} because this chapter is smaller than in the database ?`,
      icon: "warning",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "No",
      allowOutsideClick: shaking,
      backdrop: true
    })
      .then(async willUpdate => {
        if (willUpdate.isConfirmed) {
          await updateChapter();
        }
      });
  }
}

export { initUpdateBtn, updateBtn }
