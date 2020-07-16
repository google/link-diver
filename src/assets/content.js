// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

// Listens for a request from LinkService and respondes with all of the links
// from the contents of the active page
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.message === 'send links') {
    sendResponse(Array.from(document.links).map( function(val) {
      return {
        'href': val.href,
        'host': val.host,
        'tagName': val.tagName,
        'hidden': val.hidden,
        'status': 'unknown'
      };
    }));
  }
});
