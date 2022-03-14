if (url.includes("doctruyen3q")) {
    simpleBlock("pc-banner");
}

if (url.includes("nhattruyen")) {
    simpleBlock2("div.container.mrt5 > div.text-center.mrt5.mrb5");
    simpleBlock2("div.container.mrt5 > div.row");
}

if (url.includes("nettruyen")) {
    simpleBlock2("div.container.text-center.mrb5");
}

function simpleBlock(className) {
    var ads = document.getElementsByClassName(className);
    if (ads.length > 0) {
        ads[0].remove();
    }
}

function simpleBlock2(selector) {
    var ads = document.querySelectorAll(selector);
    if (ads.length > 0) {
        ads[0].remove();
    }
}