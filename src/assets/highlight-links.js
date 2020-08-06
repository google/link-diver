// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

// Listens for a request from LinkService and respondes with all of the links
// from the contents of the active page.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.message === 'highlight link') {
      if (highlightLink(request.linkData)) {
        sendResponse({
          success: true
        });
      } else {
        sendResponse({
          success: false,
          errorMessage: 'highlight conflict'
        });
      }
    }
  } catch (e) {
    console.error(e);
    sendResponse({
      success: false,
      errorMessage: 'Error highlighting links: ' + e.message
    });
  }

});

function highlightLink(link) {
  const element = document.querySelectorAll('*')[link.domId];
  const prevBgColor = element.style.backgroundColor;

  if (link.highlighted) {
    element.style.background = link.bgColor;
  } else {
    element.style.background = '#FDFF47';
  }

  element.scrollIntoViewIfNeeded();
  // Logging allows user to view source code in the console which can be more
  // helpful than highlighting
  console.log(element);
  return prevBgColor !== element.style.background;
}
