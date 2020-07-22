// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

// Listens for a request from LinkService and respondes with all of the links
// from the contents of the active page.
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
      // Only form elements can have an action attribute.
      addLinkFromAttribute(element, links, 'action');
    } else if (element.tagName === 'IMG') {
      addLinkFromAttribute(element, links, 'src');
    }
  });
  return links;
}

function addLinkFromHref(element, links) {
  if (element.tagName === 'A' || element.tagName === 'AREA') {
    // Avoid bad links, such as javascript:void(0)
    if (urlRegex.test(element.href)) {
      links.push(getLinkData(element, element.href));
    }
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

function addLinkFromAttribute(element, links, attribute) {
  let link = element.getAttribute(attribute);
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
