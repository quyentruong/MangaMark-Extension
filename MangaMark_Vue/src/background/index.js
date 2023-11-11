import getCurrentTab from '../js/utils/getCurrentTab'

console.log('background is running')

function createAlarm() {
  chrome.storage.sync.get(['INTERVAL'], (result) => {
    const periodInMinutes = result.INTERVAL === undefined ? 5 : parseInt(result.INTERVAL);
    chrome.alarms.create("periodicAlarm", {
      periodInMinutes: 0.1
    });
  })
}

createAlarm()
// async function test() {
//   const tab = await getCurrentTab()
//   const domain = new URL(tab.url).hostname
//   console.log(domain)
// }

// test()

// chrome.alarms.onAlarm.addListener((alarmInfo) => {
//   chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
//     const domain = tabs[0].url === undefined ? "" : tabs[0].url.split("//")[1].split("/")[0];
//     console.log(`${domain} running on alarm: ` + alarmInfo.name + " " + new Date(Date.now()).toISOString());
//     // if (web.some(a => domain.includes(a))) {
//     //     chrome.alarms.clear("save-periodic-alarm").then((wasCleared) => {
//     //         if (wasCleared) {
//     //             console.log("delete alarm: " + alarmInfo.name + " " + new Date(Date.now()).toISOString());
//     //             chrome.tabs.sendMessage(tabs[0].id, {action: "save"}).then((response) => {
//     //                 // console.log("Message from the content script");
//     //                 // console.log(response.response);
//     //                 create_alarm();
//     //             }).catch(handleError);
//     //         }
//     //     }).catch(handleError);
//     // }
//   }).catch(handleError);
// });

chrome.alarms.onAlarm.addListener(function (alarm) {
  // Check if the alarm is the one we created
  if (alarm.name === "periodicAlarm") {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: "periodicAlarm" });
    });
  }
});
