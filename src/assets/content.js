/// <reference types="chrome"/>

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.message === 'send links') {
    sendResponse(Array.from(document.links).map(function(val) {
      return val.href;
    }));
  }
});
