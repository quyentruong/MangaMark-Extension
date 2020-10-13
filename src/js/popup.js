/*jshint esversion: 6 */
$(function () {
    const gettingItem = browser.storage.local.get(["ID", "API_KEY"]);
    gettingItem.then(onGot, onError);

    function onGot(items) {
        $("#id").val(items.ID);
        $("#api").val(items.API_KEY);
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    $("#save").on("click", function () {
        const id = $("#id").val();
        const api = $("#api").val();
        browser.storage.local.set({"ID": id, "API_KEY": api}).then(r => window.close());
    });

    $("#option").on("click", function () {
        browser.runtime.openOptionsPage().then();
    });
});
