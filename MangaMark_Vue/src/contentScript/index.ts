import '../assets/css/contentScript.css'
import '../assets/css/positions.css'
import { initUpdateBtn } from '../js/setupButton'
import { packageName, version } from '../js/global'
import { WebsiteFactory } from '../factory/websiteFactory'
import CacheMangaApi from '../js/utils/cacheMangaApi'
import isListMatchingPattern from '../js/utils/isListMatchingPattern'
import isMatchingPattern from '../js/utils/isMatchingPattern'
import isWebsiteSupport from '../js/utils/isWebsiteSupport'
import logWithTimestamp from '../js/utils/logWithTimestamp'
import receiveCommand from '../js/receiveCommand'
import reloadCondition from '../js/utils/reloadCondition'
import autoScroll from '../js/utils/autoScroll'

// Get the current URL of the website
const url = window.location.href

// import { h } from 'vue';
// import Simple from '../components/Simple.vue';
// import { createApp } from 'vue'

async function init() {

  if (url.includes('omegascans')) {
    setInterval(async () => {
      await reloadCondition()
    }, 2000);
  }

  // Check if the website supports the current URL
  if (isWebsiteSupport(url)) {
    // Create a website object based on the current URL
    let website = WebsiteFactory.createWebsite(url)

    // Block ads on the website
    website.blockAds()

    // Log a message with the package name and version along with the current timestamp
    logWithTimestamp(`${packageName} v${version} is running`)

    // Check if the current URL matches a specific pattern
    if (isMatchingPattern(url)) {
      // Send a message to the Chrome runtime to start an alarm
      chrome.runtime.sendMessage({ command: 'startAlarm' })

      // Get the manga details from the website
      website.getMangaOnRead()
      autoScroll()

      // Read MangaApi from Cache
      await CacheMangaApi()

      // Initialize the update button
      initUpdateBtn()

      // Setup to receive command
      receiveCommand()

      // Create vnode for Simple component
      // const simpleVNode = h(Simple);

      // Insert Simple component after document.body
      // const app = document.createElement('a');
      // app.id = 'imnew';
      // createApp(simpleVNode).mount(app);
      // document.getElementById('chapterNav')?.appendChild(app);


    } else if (isListMatchingPattern(url)) {
      // Get the manga list from the website
      website.getMangaOnList()
    }
  }
}

init()
