// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

function launchApp(activeTab) {
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html'),
    openerTabId: activeTab.id,
    index: activeTab.index + 1
  });
}

// Listens for a click on the extension's toolbar icon
chrome.action.onClicked.addListener(launchApp);

// Set up the context menu only once, when the extension is installed.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "launchApp",
    title: 'Link Diver'
  });
});

// Listens for a click on any context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "launchApp" && tab) {
    launchApp(tab);
  }
});