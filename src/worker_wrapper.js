/* worker_wrapper.js */
try {
    importScripts("hot-reload.js",
        "vendor/browser-polyfill.min.js",
        "js/websites.js",
        "js/background.js");
} catch (e) {
    console.log(e);
}