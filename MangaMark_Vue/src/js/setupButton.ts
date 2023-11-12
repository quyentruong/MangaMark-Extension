import { Manga, MangaApi } from "./types/manga";
import "animate.css"
import Swal from 'sweetalert2'
import shaking from "./utils/shaking";
import { apiWebsite, packageName } from "./global";

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

async function updateBtn(manga: Manga, mangaApi: MangaApi) {
  async function updateChapter() {
    const response = await fetch(`${urlApi}?${new URLSearchParams(dataToSend)}`, {
      method: 'PUT'
    })
    const { data } = await response.json() as { data: MangaApi };
    document.getElementById("update-chapter").innerText = data.quantity;
    mangaApi.quantity = data.quantity;
  }

  const urlApi = `${apiWebsite}/api/updatemanga`;
  const storage = await chrome.storage.sync.get(["ID", "API"])
  const dataToSend = {
    user_id: storage.ID,
    chap_number: manga.chapNumber,
    manga_name: manga.title,
    api: storage.API
  };
  if (parseFloat(mangaApi.quantity) < parseFloat(manga.chapNumber)) {
    await updateChapter();
  } else if (parseFloat(mangaApi.quantity) > parseFloat(manga.chapNumber)) {
    Swal.fire({
      title: packageName,
      text: `Are you sure to update this chapter ${manga.chapNumber} because this chapter is smaller than in the database ?`,
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
