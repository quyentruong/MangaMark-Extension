if (url.includes("doctruyen3q")) {
    simpleBlock("pc-banner");
}

if (url.includes("nhattruyen") || url.includes("nettruyen")) {
    advancedBlock("div.mrb5");
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

function advancedBlock(selector) {
    var ads = document.querySelectorAll(selector);
    for (var i = 0; i < ads.length; i++) {
        ads[i].remove();
    }
}