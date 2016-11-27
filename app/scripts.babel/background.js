const css = `.${chrome.runtime.id} * { font-family: Mikachan !important; }`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == 'insertCSS') {
    chrome.tabs.insertCSS(sender.tab.id, { code: css }, res => {});
  }
});

chrome.runtime.onInstalled.addListener(details => {
  chrome.tabs.query({url: ['https://*/*', 'http://*/*']}, tabs => {
    tabs.forEach(tab => {
      chrome.tabs.executeScript(tab.id, { file: 'scripts/contentscript.js' }, res => {});
    });
  });
});

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, {method: 'toggleStatus'}, response => {
    if (response) {
      changeIcon(response.status);
    }
  });
});

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.sendMessage(activeInfo.tabId, {method: 'getStatus'}, response => {
    if (response) {
      changeIcon(response.status);
    }
  });
});

const changeIcon = status => {
  const icon = status ? 'images/icon-on.png' : 'images/icon-off.png';
  chrome.browserAction.setIcon({path: icon}, res => {});
};
