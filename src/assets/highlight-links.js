// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

// Listens for a request from LinkService and respondes with all of the links
// from the contents of the active page.
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.message === 'highlight link') {
    highlightLink(request.linkData);
  }
});

function highlightLink(link) {
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
  element.style.backgroundColor = '#FDFF47';
  element.scrollIntoViewIfNeeded();
}
