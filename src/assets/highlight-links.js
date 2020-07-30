// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

// Listens for a request from LinkService and respondes with all of the links
// from the contents of the active page.
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.message === 'highlight link') {
    sendResponse(highlightLink(request.linkData, request.newColor));
  }
});

function highlightLink(link, newColor) {
  console.log('Highlighting link', link);
  /* const queryString = /* link.tagName + '[href=\"' + link.href + '\"]';
  console.log(queryString);
  const matches = document.querySelectorAll(queryString);
  console.log(matches); */
  /* const matches = document.querySelectorAll('A');
  matches.forEach((elem) => {
    console.log(elem);
    elem.style.backgroundColor = '#FDFF47';
  });
  console.log(matches);*/

  const element = document.querySelectorAll('*')[link.domId];
  console.log(element);
  const prevBgColor = element.style.backgroundColor;
  element.style.backgroundColor = newColor;
  element.scrollIntoViewIfNeeded();
  return prevBgColor;
}
