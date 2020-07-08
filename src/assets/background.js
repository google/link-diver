// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

chrome.browserAction.onClicked.addListener(function(activeTab) {
  console.log(activeTab.index);

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tab) => console.log(tab.index));

  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html'),
    openerTabId: activeTab.id,
    index: activeTab.index + 1
  });
});
