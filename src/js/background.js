/*jshint esversion: 6 */

function create_alarm() {
    // get interval
    browser.storage.local.get(["INTERVAL"]).then((items) => {
        console.log("create alarm: save-periodic-alarm " + new Date(Date.now()).toISOString());
        const periodInMinutes = items.INTERVAL === undefined ? 5 : parseInt(items.INTERVAL);
        // create save-periodic-alarm
        browser.alarms.create("save-periodic-alarm", {
            periodInMinutes
        });
    });
}

create_alarm();

browser.alarms.onAlarm.addListener((alarmInfo) => {
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        const domain = tabs[0].url === undefined ? "" : tabs[0].url.split("//")[1].split("/")[0];
        console.log(`${domain} running on alarm: ` + alarmInfo.name + " " + new Date(Date.now()).toISOString());
        if (web.some(a => domain.includes(a))) {
            browser.alarms.clear("save-periodic-alarm").then((wasCleared) => {
                if (wasCleared) {
                    console.log("delete alarm: " + alarmInfo.name + " " + new Date(Date.now()).toISOString());
                    browser.tabs.sendMessage(tabs[0].id, {action: "save"}).then((response) => {
                        // console.log("Message from the content script");
                        // console.log(response.response);
                        create_alarm();
                    }).catch(handleError);
                }
            }).catch(handleError);
        }
    }).catch(handleError);
});

function handleError(error) {
    console.log(error);
    create_alarm();
}

// listen message from content.js and options.js
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "reset") {
        browser.alarms.clearAll().then((wasCleared) => {
            if (wasCleared) {
                console.log("delete alarm: save-periodic-alarm " + new Date(Date.now()).toISOString());
                create_alarm();
            }
        });
    }
});
