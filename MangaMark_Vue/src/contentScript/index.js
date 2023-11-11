import { initUpdateBtn, updateBtn } from "../js/setupButton";
import logWithTimestamp from "../js/utils/logWithTimestamp";
import isMatchingPattern from "../js/utils/isMatchingPattern";
import fetchManga from "../js/fetchManga";
import getChapterNumber from "../js/utils/getChapterNumber";
import isListMatchingPattern from "../js/utils/isListMatchingPattern";
import { initManga } from "../js/types/manga";
import { WebsiteFactory } from "../factory/websiteFactory";
import isWebsiteSupport from "../js/utils/isWebsiteSupport";

const url = window.location.href;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Check if the message is the alarm command
  if (message.command === "periodicAlarm") {
    // Find the button element on the page
    logWithTimestamp("alarm is running");
    logWithTimestamp(sendResponse)
    logWithTimestamp(sender)
    logWithTimestamp(message)
    // var button = document.querySelector("button");

    // Click the button
    // button.click();

    // Reset the alarm
    // chrome.runtime.sendMessage({ command: "reset" });
  }
});

// if (isListMatchingPattern(url)) {
//   let fTileChapter = document.querySelectorAll("span[itemprop='name']")
//   let temp_m = fTileChapter[2].innerHTML.trim()
//   let result = { ...initManga };
//   result.title = temp_m
//   console.log(result)
//   // let manga = factory(url);
//   // if (manga) {
//   const mangaApi = await fetchManga(result, true)
//   if (mangaApi) {
//     const temp = document.querySelectorAll("div.chapter");
//     temp.forEach((element) => {
//       if (getChapterNumber(element.textContent) == mangaApi.quantity) {
//         window.location.href = element.children[0].href
//       }

//     });

//   }
//   // }
// }
// console.log()
//
if (isWebsiteSupport(url)) {
  let website = WebsiteFactory.createWebsite(url);
  website.blockAds();
  logWithTimestamp("contentScript is running");
  if (isMatchingPattern(url)) {

    initUpdateBtn();

    let manga = website.getMangaOnRead();


    if (manga) {
      const mangaApi = await fetchManga(manga)

      document.getElementById("update-chapter").addEventListener("click", function () {
        updateBtn(manga, mangaApi);
      });

    }
  }

}


