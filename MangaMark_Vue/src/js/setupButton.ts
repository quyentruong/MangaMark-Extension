import { apiWebsite, packageName, requestReCache } from "./global";
import { MangaApi, initManga, initMangaApi, updateMangaApi } from "./types/manga";
import toDataString from "./utils/toDataString";
import CacheMangaApi from "./utils/cacheMangaApi";
import failLogin from "./utils/failLogin";
import shaking from "./utils/shaking";
import Swal from 'sweetalert2'

function initUpdateBtn() {
  let button = document.createElement("button");
  button.id = "update-chapter";
  button.innerText = "Error";
  if (initMangaApi.quantity) {
    button.innerText = initMangaApi.quantity
  }

  chrome.storage.sync.get(["POSITION"], (result) => {
    const classes = ["custom-btn", "circle-btn"];
    if (result.POSITION) {
      classes.push(result.POSITION);
    } else {
      classes.push("left_center");
    }

    button.classList.add(...classes);
  });
  document.body.appendChild(button);

  // Add a click event listener to the "update-chapter" element
  document.getElementById('update-chapter')?.addEventListener('click', async function () {
    // Call the updateBtn function with the manga details and manga API data
    await updateBtn()
  })


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

      const chapterElement = document.getElementById("update-chapter");
      if (chapterElement) {
        chapterElement.innerText = data.quantity;
      }
      updateMangaApi(data);
      requestReCache.value = true;
      await CacheMangaApi();
    }
  }

  const urlApi = `${apiWebsite}/api/updatemanga`;
  const storage = await chrome.storage.sync.get(["ID", "API"])
  const dataToSend = {
    user_id: storage.ID,
    chap_number: toDataString(initManga.chapNumber),
    manga_name: toDataString(initManga.title),
    api: storage.API
  };
  if (parseFloat(initMangaApi.quantity) < parseFloat(toDataString(initManga.chapNumber))) {
    await updateChapter();
  } else if (parseFloat(initMangaApi.quantity) > parseFloat(toDataString(initManga.chapNumber))) {
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
