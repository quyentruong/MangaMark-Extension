/*jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function (event) {
    // get id and api key from local storage
    const gettingItem = browser.storage.local.get(["ID", "API_KEY"]);
    gettingItem.then(onGot, onError);

    // set id and api key to input
    function onGot(items) {
        document.getElementById("id").value = items.ID === undefined ? "" : items.ID;
        document.getElementById("api").value = items.API_KEY === undefined ? "" : items.API_KEY;
        // $("#id").val(items.ID);
        // $("#api").val(items.API_KEY);
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    // click on save button
    document.getElementById("save").addEventListener("click", function () {
        browser.storage.local.remove(["ID", "API_KEY"]).then(() => {
            // get id and api from input
            const id = document.getElementById("id").value;
            const api = document.getElementById("api").value;
            // const id = $("#id").val();
            // const api = $("#api").val();

            // save id and api key to local storage
            browser.storage.local.set({"ID": id, "API_KEY": api}).then(() => {
                // get current tab id and domain to refresh if the domain matches in websites.js
                browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
                    const domain = tabs[0].url === undefined ? "" : tabs[0].url.split("//")[1].split("/")[0];
                    if (web.some(a => domain.includes(a))) {
                        browser.tabs.reload(tabs[0].id).then(() => {
                            window.close();
                        });
                    } else {
                        window.close();
                    }
                });
            });
        });
    });

    // open options.html
    document.getElementById("option").addEventListener("click", function () {
        browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
            // remove http(s)
            const domain = tabs[0].url === undefined ? "" : tabs[0].url.split("//")[1].split("/")[0];
            // save tab id and domain to local storage
            browser.storage.local.set({"TAB_ID": tabs[0].id, "TAB_DOMAIN": domain}).then(() => {
                browser.runtime.openOptionsPage().then(() => {
                    window.close();
                });
            });
        });
    });
});
