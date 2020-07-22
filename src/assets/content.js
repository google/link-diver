// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

// Listens for a request from LinkService and respondes with all of the links
// from the contents of the active page
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.message === 'send links') {
    sendResponse(findLinks());
  }
});

const urlRegex = /https?:\/\/[^\s]+/;

function findLinks() {
  const all = document.querySelectorAll('*');
  const links = [];
  all.forEach((element) => {
    if (element.getAttribute('href')) {
      addLinkFromHref(element, links);
    } else if (element.hasAttribute('onclick')) {
      addLinkFromOnClick(element, links);
    } else if (element.hasAttribute('action')) {
      getLinkFromFormAction(element, links);
    }
  });
  console.log(links);
  return links;
}

function addLinkFromHref(element, links) {
  if (element.tagName === 'A' || element.tagName === 'AREA') {
    links.push(getLinkData(element, element.href));
  }
}

function addLinkFromOnClick(element, links) {
  const jsFunc = element.getAttribute('onclick');
  const specialCase = /window[.]location[.]href=["'](.*)["']/;
  const specialCaseMatches = jsFunc.match(specialCase);
  const generalMatches = jsFunc.match(urlRegex);
  if (specialCaseMatches) {
    let urlString = specialCaseMatches[1];
    if (!urlRegex.test(urlString)) {
      urlString = window.location.origin + urlString;
    }
    links.push(getLinkData(element, urlString));
  } else if (generalMatches) {
    links.push(getLinkData(element, generalMatches[0]));
  }
}

function getLinkFromFormAction(element, links) {
  let link = element.getAttribute('action');
  if (!urlRegex.test(link)) {
    link = window.location.origin + link;
  }
  links.push(getLinkData(element, link));
}

function getLinkData(element, urlString) {
  const url = new URL(urlString);
  return {
    'href': url.href,
    'host': url.host,
    'tagName': element.tagName,
    'hidden': element.hidden
  };
}
