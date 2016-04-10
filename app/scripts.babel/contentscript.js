'use strict';

let itolized = false;
let beforeFont = '';

let methods = {
  toggle: sendResponse => {
    let body = document.getElementsByTagName('body')[0];
    if (itolized) {
      body.classList.remove(chrome.runtime.id);
      itolized = false;
    } else {
      body.classList.add(chrome.runtime.id);
      itolized = true;
    }
    sendResponse({status: itolized});
  },
  status: sendResponse => sendResponse({status: itolized})
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  methods[request.method](sendResponse);
});
chrome.runtime.sendMessage(null, {message: 'insertCSS'}, (res) => {});
