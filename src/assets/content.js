// eslint-disable-next-line spaced-comment
/// <reference types="chrome"/>

// Listens for a request from LinkService and respondes with all of the links
// from the contents of the active page.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.message === 'send link data') {
      const links = findLinks();
      sendResponse({
        success: true,
        linkList: links
      });
    }
  } catch (e) {
    sendResponse({
      success: false,
      errorMessage: e.message
    });
  }
});

const urlRegex = /https?:\/\/[^\s]+/;
let instanceCount = 0;

function findLinks() {
  const all = document.querySelectorAll('*');
  const instanceId = instanceCount;
  instanceCount += 1;
  const links = [];
  all.forEach((element, index) => {
    if (element.getAttribute('href')) {
      addLinkFromHref(element, index, instanceId, links);
    } else if (element.hasAttribute('onclick')) {
      addLinkFromOnClick(element, index, instanceId, links);
    } else if (element.hasAttribute('action')) {
      // Only form elements can have an action attribute.
      addLinkFromAttribute(element, index, instanceId, links, 'action');
    } else if (element.tagName === 'IMG') {
      addLinkFromAttribute(element, index, instanceId, links, 'src');
    }
  });
  return links;
}

function addLinkFromHref(element, index, instanceId, links) {
  if (element.tagName === 'A' || element.tagName === 'AREA') {
    // Avoid bad links, such as javascript:void(0)
    if (urlRegex.test(element.href)) {
      links.push(getLinkData(element, index, instanceId, element.href));
    }
  }
}

function addLinkFromOnClick(element, index, instanceId, links) {
  const jsFunc = element.getAttribute('onclick');
  const specialCase = /window[.]location[.]href=["'](.*)["']/;
  const specialCaseMatches = jsFunc.match(specialCase);
  const generalMatches = jsFunc.match(urlRegex);
  if (specialCaseMatches) {
    let urlString = specialCaseMatches[1];
    if (!urlRegex.test(urlString)) {
      urlString = window.location.origin + urlString;
    }
    links.push(getLinkData(element, index, instanceId, urlString));
  } else if (generalMatches) {
    links.push(getLinkData(element, index, instanceId, generalMatches[0]));
  }
}

function addLinkFromAttribute(element, index, instanceId, links, attribute) {
  let link = element[attribute];
  if (!urlRegex.test(link)) {
    link = window.location.origin + link;
  }
  links.push(getLinkData(element, index, instanceId, link));
}

function getLinkData(element, index, instanceId, urlString) {
  let url;

  try {
    url = new URL(urlString);
  } catch (e) {
    console.error('Found bad URL: ' + urlString);
    console.log(element);
    url = {host: 'unknown', href: urlString};
  }

  const htmlSource = element.outerHTML;

  // The instance id allows us to avoid conflicts if multiple instances are
  // opened and assign highlightIds to the DOM elements
  const highlightId = `link-diver-id-${instanceId}-${index}`;
  element.classList.add(highlightId);

  return {
    'href': url.href,
    'host': url.host,
    'tagName': element.tagName,
    'visible': isVisible(element),
    'source': htmlSource,
    'domId': index,
    'highlightId': highlightId,
    'highlighted': false
  };
}

function isVisible(element) {
  return element.offsetWidth > 0 && element.offsetHeight > 0;
}
