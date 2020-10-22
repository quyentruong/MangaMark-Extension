/*jshint esversion: 6 */

function create_alarm() {
    browser.storage.local.get(["INTERVAL"]).then((items) => {
        const periodInMinutes = items.INTERVAL === undefined ? 5 : parseInt(items.INTERVAL);
        browser.alarms.create("save-periodic-alarm", {
            periodInMinutes
        });

    });

}

create_alarm();
browser.alarms.onAlarm.addListener(handleAlarm);

function handleAlarm(alarmInfo) {
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        console.log("on alarm: " + alarmInfo.name + " " + new Date(Date.now()).toISOString());
        const domain = tabs[0].url === undefined ? "" : tabs[0].url.split("//")[1].split("/")[0];
        if (web.some(a => domain.includes(a))) {
            browser.alarms.clear("save-periodic-alarm").then(() => {
                browser.tabs.sendMessage(tabs[0].id, {action: "save"}).then((response) => {
                    // console.log("Message from the content script");
                    // console.log(response.response);
                    create_alarm();
                }).catch(handleError);
            }).catch(handleError);
        }
    }).catch(handleError);
}


function handleError(error) {
    console.log(error);
    create_alarm();
}
