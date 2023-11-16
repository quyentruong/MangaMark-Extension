// @ts-nocheck
import Swal from "sweetalert2";
import logWithTimestamp from "./logWithTimestamp";
import { CachedValue } from "webext-storage-cache";

/**
 * Decompress a binary string representation with browser native APIs in to a normal js string
 *
 * @param binary - Binary string that should be decompressed, e.g. the output from `atob`
 * @param encoding - Decompression algorithm to use
 * @returns The decompressed string
 */
export async function decompressRaw(binary: string, encoding: CompressionFormat): Promise<string> {
  // stream the string through the decompressor
  const stream = new Blob([Uint8Array.from(binary, (m) => m.codePointAt(0))])
    .stream()
    .pipeThrough(new DecompressionStream(encoding));
  // convert the stream to a string
  return new Response(stream).text();
}

/**
 * Decompress a string representation with browser native APIs in to a normal js string
 *
 * @param data - String that should be decompressed
 * @param encoding - Decompression algorithm to use
 * @returns The decompressed string
 */
export async function decompress(data: string, encoding: CompressionFormat): Promise<string> {
  try {
    return decompressRaw(atob(data), encoding);
  } catch (error) {
    logWithTimestamp(error);
    // reload page
    let timerInterval: number | undefined;
    Swal.fire({
      title: "Auto reload alert!",
      html: "Found cache problem.<br>Page will reload in <b></b> milliseconds.",
      timer: 4000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then(async (result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        const cacheApi = new CachedValue('MangaApi')
        await cacheApi.delete()
        location.reload();
      }
    });
  }
}
