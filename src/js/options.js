/*jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function (event) {

    for (let i = 0; i < web.length; i++) {
        const a = document.createElement("a");
        const node = document.createTextNode(web[i]);
        const br = document.createElement("br");
        a.appendChild(node);
        a.setAttribute("href", "http://" + web[i]);
        a.setAttribute("target", "_blank");

        document.getElementById("list_website").appendChild(a);
        document.getElementById("list_website").appendChild(br);
    }

    document.getElementById("web_count").innerText = web.length.toString();

    // get position for badge from local storage
    browser.storage.local.get(["POSITION", "INTERVAL"]).then((items) => {
        if (items.POSITION !== undefined) {
            document.querySelector(`input[value=${items.POSITION}]`).setAttribute("checked", "true");
            // $(`input[value=${items.POSITION}]`).prop("checked", true);
        }
        if (items.INTERVAL !== undefined) {
            document.querySelector('#interval').value = Math.ceil(items.INTERVAL);
        }
    });

    function onError(error) {
        console.log(`Error: ${error}`);
        window.close();
    }

    // click on save button
    document.getElementById("save").addEventListener("click", function () {
        // const position = $("input[name='position']:checked").val();
        const position = document.querySelector("input[name='position']:checked").value;
        const interval = Math.ceil(document.querySelector("#interval").value);

        // save position for badge to local storage
        browser.storage.local.set({"POSITION": position, "INTERVAL": interval}).then(() => {
            // get tab id and domain to refresh if the domain matches in websites.js
            browser.storage.local.get(["TAB_ID", "TAB_DOMAIN"]).then((items) => {
                if (web.some(a => items.TAB_DOMAIN.includes(a))) {
                    browser.tabs.reload(items.TAB_ID).then(() => {
                        browser.tabs.update(items.TAB_ID, {
                            active: true,
                        }).then(() => {
                            reset_alarm();
                            window.close();
                        }, onError);
                    }, onError);
                } else {
                    window.close();
                }
            });
        });
    });
});

function reset_alarm() {
    // sending reset alarm to background.js
    browser.runtime.sendMessage({action: "reset"}).then();
}
