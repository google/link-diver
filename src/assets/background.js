// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

// Listens for a click of the extension button at which point it launches
// the extension in a new tab
chrome.browserAction.onClicked.addListener(function(activeTab) {
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html'),
    openerTabId: activeTab.id,
    index: activeTab.index + 1
  });
});
