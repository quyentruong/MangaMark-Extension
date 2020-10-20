/*jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function (event) {
    // get position for badge from local storage
    browser.storage.local.get(["POSITION"]).then((items) => {
        if (items.POSITION !== undefined) {
            document.querySelector(`input[value=${items.POSITION}]`).setAttribute("checked", "true");
            // $(`input[value=${items.POSITION}]`).prop("checked", true);
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

        // save position for badge to local storage
        browser.storage.local.set({"POSITION": position}).then(() => {
            // get tab id and domain to refresh if the domain matches in websites.js
            browser.storage.local.get(["TAB_ID", "TAB_DOMAIN"]).then((items) => {
                if (web.some(a => items.TAB_DOMAIN.includes(a))) {
                    browser.tabs.reload(items.TAB_ID).then(() => {
                        browser.tabs.update(items.TAB_ID, {
                            active: true,
                        }).then(() => {
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
