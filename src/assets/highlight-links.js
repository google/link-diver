// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

// Listens for a request from LinkService and respondes with all of the links
// from the contents of the active page.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.message === 'highlight link') {
      const color = highlightLink(request.linkData, request.newColor);
      sendResponse({
        success: true,
        prevColor: color
      });
    }
  } catch (e) {
    console.error(e);
    sendResponse({
      success: false,
      errorMessage: 'Error highlighting links: ' + e.message
    });
  }

});

function highlightLink(link, newColor) {
  const element = document.querySelectorAll('*')[link.domId];
  const prevBgColor = element.style.backgroundColor;
  element.style.backgroundColor = newColor;
  element.scrollIntoViewIfNeeded();
  // Logging allows user to view source code in the console which can be more
  // helpful than highlighting
  console.log(element);
  return prevBgColor;
}
