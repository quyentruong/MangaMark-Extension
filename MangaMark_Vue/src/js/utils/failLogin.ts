import Swal from "sweetalert2";
import { packageName } from "../global";
import shaking from "./shaking";

export default function failLogin(): void {
  Swal.fire({
    title: packageName,
    text: `ID or API Key is incorrect. Please check your setting in extension.`,
    icon: "error",
    allowOutsideClick: shaking,
    backdrop: true
  }).then(() => {
    chrome.storage.sync.set({
      isFailLogin: true,
    })
  });
}
