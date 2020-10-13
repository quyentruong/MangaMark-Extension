// console.log(window.location.href)
// let paragrahps = document.getElementsByTagName("p")
//
//
// chrome.runtime.onMessage.addListener(gotMessage);
//
// function gotMessage(message, sender, sendResponse) {
//     console.log(message.txt);
//     if (message.txt === "hello") {
//         for (elt of paragrahps) {
//             elt.style['background-color'] = '#FF00FF'
//         }
//     }
// }
/*jshint esversion: 6 */
const api_website = "https://mangamark.herokuapp.com";
const url = window.location.href;
// let where_to_put_button = "";
let chap_number = $("span[itemprop='name']");
let number = 0;
let manga;
let position = "";
let button = "";
browser.storage.local.get(["POSITION"]).then(getPosition);

function getPosition(items) {
    position = items.POSITION !== undefined ? items.POSITION : "top_left";
    button = `<a href="javascript:void(0)" class='updateChap custom-btn ${position}'>Error</a>`;
    start();
}

// const button = "<a href=\"javascript:void(0)\" class='btn updateChap' style='margin-left: 15px; margin-right: 15px; background-color: #001c4f;color:white;'>Not Available</a>"

function start() {
    if (url.includes("nettruyen.com/truyen-tranh") || url.includes("nhattruyen.com/truyen-tranh")) {
        // where_to_put_button = $("a.a_next");
        // where_to_put_button.after(button);
        // $(".updateChap").css({'background-color': "#5cb85c"})
        number = chap_number[3].innerHTML.trim().split(" ")[1];
        manga = chap_number[2].innerHTML.trim();
    }

    if (url.includes("truyentranhaudio.com")) {
        // where_to_put_button = $(".navbar-form");
        // where_to_put_button.parent().before(`<li>${button}</li>`);
        // $(".updateChap").css({'background-color': "transparent"})
        number = chap_number[3].innerHTML.trim().split(" ")[1];
        manga = chap_number[2].innerHTML.trim();
    }

    if (url.includes("mangakakalot.com/chapter")) {
        // where_to_put_button = $("span.span-name");
        // where_to_put_button.before(button);
        // $(".updateChap").css({'background-color': "white", color: "red", "font-size": "16px"})
        number = chap_number[2].innerHTML.trim().split(" ")[1];
        manga = chap_number[1].innerHTML.trim();
    }

    if (url.includes("shieldmanga.club/manga") || url.includes("truyentranhaudio.online/manga-slug") || url.includes("mangatx.com/manga") || url.includes("https://truyenz.info/manga")) {
        // where_to_put_button = $(".nav-links");
        // where_to_put_button.before(`<div>${button}</div>`);
        chap_number = $(".active");
        number = chap_number[0].innerText.trim().split(" ")[1];
        manga = $(".breadcrumb")[0].children[1].children[0].innerHTML.trim();
    }

    if (url.includes("truyensieuhay.com/doc-truyen")) {
        // where_to_put_button = $("#button_thanks");
        // where_to_put_button.replaceWith(button);
        chap_number = $("span[itemprop='title']");
        number = chap_number[2].innerText.trim().split(" ")[1];
        manga = chap_number[1].innerText.trim();
    }

    if (url.includes("a3manga.com")) {
        // $("div.bs-callout-danger").remove();
        // where_to_put_button = $("#prev-link");
        // where_to_put_button.before(button);
        $("#view-chapter").css({"position": "unset"});
        number = chap_number[2].innerHTML.trim().split(" ")[1];
        manga = chap_number[1].innerHTML.trim();
    }

    if (manga !== undefined) {
        chap_number.after(button);
        const gettingItem = browser.storage.local.get(["ID", "API_KEY"]);
        gettingItem.then(onGot, onError);

        function onGot(items) {
            get_manga(items.ID, items.API_KEY, manga);
        }

        function onError(error) {
            console.log(`Error: ${error}`);
        }
    }
}

function get_manga(id, api_key, manga) {
    const url_api = `${api_website}/api/getinfomanga`;

    const data_to_send = {
        user_id: id,
        manga_name: manga,
        api: api_key
    };
    $.get(url_api, data_to_send).done(function (response) {
        update_button(id, api_key, manga, response.data.quantity);
    }).fail(function (error) {
        if (error.status === 404)
            alert("Manga Mark\nPlease go to the website to create this manga");
        else
            alert("Manga Mark\nID or API Key is incorrect");
    });
}

function update_button(id, api_key, manga, quantity) {
    const update_button = $(".updateChap");
    update_button.html(`${quantity}`);
    const url_api = `${api_website}/api/updatemanga`;
    const data_to_send = {
        user_id: id,
        chap_number: number,
        manga_name: manga,
        api: api_key
    };

    update_button.on("click", function () {
        if (quantity < number) {
            update_chapter(update_button, url_api, data_to_send);
        } else if (quantity > number) {
            let con = confirm("Manga Mark\nAre you sure to update this chapter because this chapter is smaller than in the database ?");
            if (con === true) {
                update_chapter(update_button, url_api, data_to_send);
            }
        }
    });
}

function update_chapter(update_button, url_api, data_to_send) {
    $.ajax({
        url: url_api,
        type: 'PUT',
        data: data_to_send,
        success: function (response) {
            update_button.html(`${response.data.quantity}`);
        }
    });
}
