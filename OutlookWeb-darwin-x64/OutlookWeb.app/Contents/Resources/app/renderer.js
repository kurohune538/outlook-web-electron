// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const $ = require("jquery");

let observer = new MutationObserver(function (MutationRecords, MutationObserver) {
    alert("observer");
});

observer.observe($(".o365cs-notifications-notificationPopupArea").get(0), {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
});