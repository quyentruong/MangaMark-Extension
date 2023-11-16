import Swal from "sweetalert2";
import { packageName } from "../global";
import shaking from "./shaking";

/**
 * A function that handles a failed login attempt.
 *
 * @return {void} This function does not return anything.
 */
export default function failLogin(): void {
  chrome.storage.sync.set({
    isFailLogin: true
  })
  Swal.fire({
    title: packageName,
    text: `ID or API Key is incorrect. Please check your setting in extension.`,
    icon: "error",
    allowOutsideClick: shaking,
    backdrop: true,
  })
}
