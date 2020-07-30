// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

function launchApp(activeTab) {
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html'),
    openerTabId: activeTab.id,
    index: activeTab.index + 1
  });
}

// Listens for a click of the extension button at which point it launches
// the extension in a new tab
chrome.browserAction.onClicked.addListener(launchApp);

// Creates an item in the context menu which allows the user to launch the app
chrome.contextMenus.create({
  title: 'Link Diver',
  onclick: function(e) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      launchApp(tabs[0]);
    });
  }
});
