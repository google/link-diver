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
      errorMessage: 'Error highlighting links: ' + e.message
    });
  }

});

function highlightLink(link) {
  const matches = document.getElementsByClassName(link.highlightId);

  if (matches.length === 0) {
    alert('Could not find the selected link on the original page. ' +
        'Link Diver\'s data could be out of date, ' +
        'please try reloading Link Diver to get the most up to date links.');
    throw new Error('selected link could not be found on the page');
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
