import { initUpdateBtn, updateBtn } from "../js/setupButton";
import logWithTimestamp from "../js/utils/logWithTimestamp";
import isMatchingPattern from "../js/utils/isMatchingPattern";
import fetchManga from "../js/fetchManga";
import { WebsiteFactory } from "../factory/websiteFactory";
import isWebsiteSupport from "../js/utils/isWebsiteSupport";
import receiveCommand from "../js/receiveCommand";
import { packageName, version } from "../js/global";
import isListMatchingPattern from "../js/utils/isListMatchingPattern";
import '../assets/css/positions.css';
import '../assets/css/contentScript.css';

// Get the current URL of the website
const url = window.location.href;

async function init() {
  // Check if the website supports the current URL
  if (isWebsiteSupport(url)) {
    // Create a website object based on the current URL
    let website = WebsiteFactory.createWebsite(url);

    // Block ads on the website
    website.blockAds();

    // Log a message with the package name and version along with the current timestamp
    logWithTimestamp(`${packageName} v${version} is running`);

    // Check if the current URL matches a specific pattern
    if (isMatchingPattern(url)) {
      // Initialize the update button
      initUpdateBtn();

      // Send a message to the Chrome runtime to start an alarm
      chrome.runtime.sendMessage({ command: 'startAlarm' });

      // Get the manga details from the website
      let manga = website.getMangaOnRead();

      // Check if manga details are available
      if (manga) {
        // Fetch manga data from the manga API asynchronously
        const mangaApi = await fetchManga(manga)

        // Receive a command based on the manga details and manga API data
        receiveCommand(manga, mangaApi);

        // Add a click event listener to the "update-chapter" element
        document.getElementById("update-chapter").addEventListener("click", function () {
          // Call the updateBtn function with the manga details and manga API data
          updateBtn(manga, mangaApi);
        });
      }
    } else if (isListMatchingPattern(url)) {
      website.getMangaOnList();
    }
  }
}

init()
