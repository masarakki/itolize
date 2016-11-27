'use strict';

let itolized = false;

const toggleStatus = res => {
  const body = document.getElementsByTagName('body')[0];

  if (itolized) {
    body.classList.remove(chrome.runtime.id);
    itolized = false;
  } else {
    body.classList.add(chrome.runtime.id);
    itolized = true;
  }
  res({status: itolized});
};

const getStatus = res => {
  res({status: itolized});
};

const methods = { toggleStatus, getStatus };

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  methods[request.method](sendResponse);
});
chrome.runtime.sendMessage(null, {message: 'insertCSS'}, (res) => {});
