/*jshint esversion: 6 */
const api_website = "https://mangamark.herokuapp.com";
const url = window.location.href;
// let where_to_put_button = "";
// let chap_number = $("span[itemprop='name']");
let chap_number = document.querySelectorAll("span[itemprop='name']");
let number = 0;
let manga;
let position = "";
// let button = "";
let button = document.createElement("button");
// button.setAttribute("href", "javascript:void(0)");
button.innerText = "Error";
browser.storage.local.get(["POSITION"]).then(getPosition);

function getPosition(items) {
    position = items.POSITION !== undefined ? items.POSITION : "top_left";
    button.classList.add("updateChap", "custom-btn", "circle-btn", position);

    // button = `<a href="javascript:void(0)" class='updateChap custom-btn circle-btn ${position}'>Error</a>`;
    start();
}

// const button = "<a href=\"javascript:void(0)\" class='btn updateChap' style='margin-left: 15px; margin-right: 15px; background-color: #001c4f;color:white;'>Not Available</a>"

function errorMessage(error) {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("custom-btn", "errorMessage");
    errorDiv.innerText = error;
    return errorDiv;
    // return `<div class="custom-btn errorMessage">${error}</div>`;
}

function start() {
    const site_active_1 = [
        "nettruyen",
        "nhattruyen",
        "truyenchon",
        "a3manga",
        "ngonphong",
        "vcomic",
        "truyentranhaudio",
        "truyen86"
    ];
    if (site_active_1.some(a => url.includes(a))) {
        const imgTags = document.querySelectorAll("img");
        for (let imgTag of imgTags) {
            imgTag.style.position = "static";
        }

        // $('img').css({"position": "static"});
        // where_to_put_button = $("a.a_next");
        // where_to_put_button.after(button);
        // $(".updateChap").css({'background-color': "#5cb85c"})
        number = chap_number[3].innerHTML.trim().split(" ")[1];
        manga = chap_number[2].innerHTML.trim();
    }

    const site_active_2 = [
        "saytruyen.net/doc",
        "mangakakalot",
        "truyenqq.com/truyen-tranh",
        "cmanga"
    ];
    if (site_active_2.some(a => url.includes(a))) {
        // where_to_put_button = $("span.span-name");
        // where_to_put_button.before(button);
        // $(".updateChap").css({'background-color': "white", color: "red", "font-size": "16px"})
        number = chap_number[2].innerHTML.trim().split(" ")[1];
        manga = chap_number[1].innerHTML.trim();
    }

    const site_active_3 = [
        "mangafoxfull.com/manga",
        "shieldmanga",
        "mangatx.com/manga",
        "truyenz.info/manga",
        "www.webtoon.xyz/read",
        "tienycomic.xyz/manga",
        "manhuarock.net",
        "vcomi"
    ];

    if (site_active_3.some(a => url.includes(a))) {
        // where_to_put_button = $(".nav-links");
        // where_to_put_button.before(`<div>${button}</div>`);
        // chap_number = $(".active");
        chap_number = document.querySelectorAll(".active");
        number = chap_number[0].innerText.trim().split(" ")[1];
        // manga = $(".breadcrumb")[0].children[1].children[0].innerHTML.trim();
        manga = document.querySelectorAll(".breadcrumb")[0].children[1].children[0].innerHTML.trim();
        // mangafoxful
        if (manga === "All Mangas" || manga === "Danh sách truyện") {
            manga = document.querySelectorAll(".breadcrumb")[0].children[2].children[0].innerHTML.trim();
        }
    }

    if (url.includes("manganelo") || url.includes("readmanganato")) {
        chap_number = document.querySelector(".panel-breadcrumb").children;
        manga = chap_number[2].innerText.trim();
        number = getChapterNumber(chap_number[4]);
    }

    if (url.includes("wcomic")) {
        chap_number = document.querySelector(".opacity").children[1].innerHTML.split("Chapter");
        manga = chap_number[0].trim();
        number = chap_number[1].trim();
    }

    // if (url.includes("beeng.net")) {
    //     chap_number = document.querySelector(".comicName").innerText.split(":");
    //     manga = chap_number[0].trim();
    //     number = chap_number[1].trim().split(" ")[1];
    // }

    if (url.includes("vlogtruyen")) {
        chap_number = document.querySelector(".title-manga-read").innerText.split(":");
        manga = chap_number[0].trim();
        number = chap_number[1].trim().split(" ")[1];
    }

    if (url.includes("truyensieuhay")) {
        // where_to_put_button = $("#button_thanks");
        // where_to_put_button.replaceWith(button);
        // chap_number = $("span[itemprop='title']");
        chap_number = document.querySelectorAll("span[itemprop='title']");
        number = chap_number[2].innerText.trim().split(" ")[1];
        manga = chap_number[1].innerText.trim();
    }

    if (url.includes("doctruyen3qz")) {
        const imgTags = document.querySelectorAll("img");
        for (let imgTag of imgTags) {
            imgTag.style.position = "static";
        }

        chap_number = document.querySelectorAll("h1.chapter-info")[0].innerText.trim().split(" - Chapter ");
        manga = chap_number[0].trim();
        number = chap_number[1].trim();
    }

    // if (url.includes("mangareader.net")) {
    //     chap_number = document.querySelector(".d55").innerText.split(" ");
    //     number = chap_number[chap_number.length - 1];
    //     manga = chap_number.slice(0, chap_number.length - 1).join(" ");
    // }

    if (url.includes("www.webtoons.com")) {
        const viewChapter = document.querySelector(".cont_box");
        viewChapter.style.position = "unset";
        manga = document.querySelector(".subj").innerText;
        const comma = manga.split(",").length - 1;
        const re = /Episode\s|Ep\.\s/;
        const reg = /^\d+$/;
        number = document.querySelector(".subj_episode").innerText.split(re);
        if (number[0].toLowerCase().includes("season") || !reg.test(number[1])) {
            chap_number = getMeta('keywords').split(",").slice(0, comma + 2);
            number = chap_number[comma + 1].trim();
        } else {
            number = number[1];
        }
    }

    // if (url.includes("mangadex.org/chapter")) {
    //     setTimeout(function () {
    //         chap_number = getMeta('keywords').split(",")[0].split(" Chapter ");
    //         number = chap_number[1];
    //         manga = chap_number[0];
    //         const prev = document.querySelectorAll("a.arrow-link")[0];
    //         const next = document.querySelectorAll("a.arrow-link")[1];
    //         const selector = document.querySelector("#jump-chapter");
    //
    //         prev.addEventListener("click", function () {
    //             window.location.href = prev.getAttribute('href');
    //         });
    //
    //         next.addEventListener("click", function () {
    //             window.location.href = next.getAttribute('href');
    //         });
    //
    //
    //         selector.addEventListener("change", function () {
    //             window.location.href = '/chapter/' + this.value;
    //         });
    //
    //         call_if_manga_found();
    //     }, 2000);
    // }

    // https://h5.mangatoon.mobi/contents/detail/781
    if (url.includes("h5.mangatoon.mobi/cartoons/watch")) {
        delay(2000).then(() => {
            number = document.querySelector(".episode-title").innerText.split(" ")[1];
            const manga_url = window.location.href.split("://")[1];
            manga = manga_url.split("/").slice(0, 4).join("/");

            const backBtn = document.querySelector(".back");
            backBtn.addEventListener("click", () => {
                const id = manga_url.split("/")[3];
                window.location.href = `https://h5.mangatoon.mobi/contents/detail/${id}`;
            });

            call_if_manga_found();
        });
    }

    if (url.includes("h5.mangatoon.mobi/contents/detail")) {
        delay(2000).then(() => {
            document.querySelectorAll(".btn-item")[1].addEventListener("click", () => {
                delay(1500).then(() => {
                    document.querySelector(".detail-episodes-list").addEventListener("click", () => {
                        delay(1500).then(() => {
                            window.location.reload();
                        });
                    });
                });

            });
            document.querySelector(".nav-icon").addEventListener("click", () => {
                window.location.href = "https://h5.mangatoon.mobi";
            });
            document.querySelector(".fast-read-btn").addEventListener("click", () => {
                delay(1500).then(() => {
                    window.location.reload();
                });
            });

        });
    }


    call_if_manga_found();
}

function getChapterNumber(str) {
    const x = str.innerText.trim().match(/Chapter\s(\d+)/);
    return x[1];
}

function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t);
    });
}

// function

function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');
    // console.log(metas)

    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName) {
            return metas[i].getAttribute('content');
        }
    }

    return '';
}

function call_if_manga_found() {
    if (manga !== undefined) {
        // chap_number.after(button);
        browser.storage.local.get(["ID", "API_KEY"]).then((items) => {
            get_manga(items.ID, items.API_KEY, manga);
        }, (error) => {
            console.log(`Error: ${error}`);
        });
    }
}

// $(window).on('scroll', function () {
//     console.log('width ' + window.innerWidth);
//     console.log('image ' + window.scrollX + document.querySelector('#image-0').getBoundingClientRect().left);
// });


function get_manga(id, api_key, manga) {
    console.log("Manga Mark Activate");
    const url_api = `${api_website}/api/getinfomanga`;

    const data_to_send = new URLSearchParams({
        user_id: id,
        manga_name: manga,
        api: api_key
    });
    fetch(`${url_api}?${data_to_send}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                });
            }
        })
        .then(response => {
            document.body.appendChild(button);
            // chap_number.after(button);
            update_button(id, api_key, manga, response.data.quantity);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Manga Mark is working correctly',
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch(error => {
            console.log(error);

            if (error.status === 404) {
                Swal.fire({
                    title: "Manga Mark",
                    text: `Please go to the website to add this manga in your account`,
                    icon: "error",
                    confirmButtonText: "Go to website",
                    showCancelButton: true,
                    allowOutsideClick: shaking
                })
                    .then(gowebsite => {
                        if (gowebsite.isConfirmed) {
                            window.open("https://mangamark.herokuapp.com", '_blank').focus();
                        }
                    });
                // document.body.after(errorMessage("Please go to the website to create this manga."));
                // $("body").after(errorMessage("Please go to the website to create this manga"));
            } else if (error.status === 500 || error.status == 302) {
                Swal.fire({
                    title: "Manga Mark",
                    text: `ID or API Key is incorrect. Please check your setting in extension.`,
                    icon: "error",
                    allowOutsideClick: shaking
                });
                // document.body.after(errorMessage("ID or API Key is incorrect"));
                // $("body").after(errorMessage("ID or API Key is incorrect"));
            }
        });
    // ajax
    // $.get(url_api, data_to_send, function (response) {
    //     chap_number.after(button);
    //     update_button(id, api_key, manga, response.data.quantity);
    // }).fail(function (error) {
    //     if (error.status === 404) {
    //         $("body").after(errorMessage("Please go to the website to create this manga"));
    //         // alert("Manga Mark\nPlease go to the website to create this manga");
    //     } else {
    //         $("body").after(errorMessage("ID or API Key is incorrect"));
    //         // alert("Manga Mark\nID or API Key is incorrect");
    //     }
    // });
}

function shaking() {
    const popup = Swal.getPopup();
    popup.classList.remove('swal2-show');
    setTimeout(() => {
        popup.classList.add('animate__animated', 'animate__headShake');
    });
    setTimeout(() => {
        popup.classList.remove('animate__animated', 'animate__headShake');
    }, 500);
    return false;
}

function update_button(id, api_key, manga, quantity) {
    let update_button = document.querySelector(".updateChap");
    update_button.innerText = quantity;
    // const update_button = $(".updateChap");
    // update_button.html(`${quantity}`);
    const url_api = `${api_website}/api/updatemanga`;

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "save") {
            update_button = document.querySelector(".updateChap");
            if (url.includes("h5.mangatoon.mobi/cartoons/watch")) {
                number = parseFloat(document.querySelector(".episode-title").innerText.split(" ")[1]);
            }
            // console.log(quantity);
            // console.log(number);
            if (parseFloat(update_button.innerText) < number) {
                const data_to_send = new URLSearchParams({
                    user_id: id,
                    chap_number: number,
                    manga_name: manga,
                    api: api_key
                });

                Swal.fire({
                    title: "Manga Mark",
                    text: `Do you want to update chapter to ${number}?`,
                    icon: "info",
                    confirmButtonText: "Yes",
                    showCancelButton: true,
                    cancelButtonText: "No",
                    allowOutsideClick: shaking
                })
                    .then(willUpdate => {
                        if (willUpdate.isConfirmed) {
                            update_chapter(update_button, url_api, data_to_send);
                        }
                    });
            }
        }
        return Promise.resolve({
            response: "Hi from content script"
        });
        // sendResponse({response: "Response from content script"});
    });


    // if (parseInt(quantity) < number && number % 5 === 0) {
    //     const data_to_send = new URLSearchParams({
    //         user_id: id,
    //         chap_number: number,
    //         manga_name: manga,
    //         api: api_key
    //     });
    //     let con = confirm(`Manga Mark\nDo you want to update chap to ${number}?`);
    //     if (con === true) {
    //         update_chapter(update_button, url_api, data_to_send);
    //     }
    // }

    update_button.addEventListener("click", function () {
        const current = parseFloat(update_button.innerText);
        if (url.includes("h5.mangatoon.mobi/cartoons/watch")) {
            number = parseFloat(document.querySelector(".episode-title").innerText.split(" ")[1]);
        }
        const data_to_send = {
            user_id: id,
            chap_number: number,
            manga_name: manga,
            api: api_key
        };
        if (current < number) {
            update_chapter(update_button, url_api, data_to_send);
        } else if (current > number) {
            Swal.fire({
                title: "Manga Mark",
                text: `Are you sure to update this chapter because this chapter is smaller than in the database ?`,
                icon: "warning",
                confirmButtonText: "Yes",
                showCancelButton: true,
                cancelButtonText: "No",
                allowOutsideClick: shaking
            })
                .then(willUpdate => {
                    if (willUpdate.isConfirmed) {
                        update_chapter(update_button, url_api, data_to_send);
                    }
                });
        }
    });
}

function reset_alarm() {
    // sending reset alarm to background.js
    browser.runtime.sendMessage({
        action: "reset"
    }).then();
}

function update_chapter(update_button, url_api, data_to_send) {
    fetch(`${url_api}?${new URLSearchParams(data_to_send)}`, {
        method: 'PUT'
    })
        .then(response => response.json())
        .then(response => {
            update_button.innerText = response.data.quantity;
            reset_alarm();
            // update_button.html(`${response.data.quantity}`);
        });
    // $.ajax({
    //     url: url_api,
    //     type: 'PUT',
    //     data: data_to_send,
    //     success: function (response) {
    //         update_button.html(`${response.data.quantity}`);
    //     }
    // });
}