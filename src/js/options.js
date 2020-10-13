/*jshint esversion: 6 */
$(function () {
    browser.storage.local.get(["POSITION"]).then((items) => {
        $(`input[value=${items.POSITION}]`).prop("checked", true);
    });

    $("#save").on("click", function () {
        const position = $("input[name='position']:checked").val();

        browser.storage.local.set({"POSITION": position}).then(() => window.close());
    });
});
