// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

// Listens for a request from LinkService and respondes with all of the links
// from the contents of the active page.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.message === 'highlight link') {
      sendResponse({
        success: true,
        highlightOn: highlightLink(request.linkData)
      });
    }
  } catch (e) {
    console.error(e);
    sendResponse({
      success: false,
      errorMessage: e.message
    });
  }

});

function highlightLink(link) {
  const matches = document.getElementsByClassName(link.highlightId);

  if (matches.length === 0) {
    throw new Error('link not found');
  }

  const element = matches[0];
  const highlightClass = 'link-diver-highlight';

  const isHighlighted = element.classList.contains(highlightClass);
  if (isHighlighted) {
    element.classList.remove(highlightClass);
  } else {
    element.classList.add(highlightClass);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
    element.focus();
  }

  // Logging allows user to view source code in the console which can be more
  // helpful than highlighting
  console.log(element);
  return !isHighlighted;
}
