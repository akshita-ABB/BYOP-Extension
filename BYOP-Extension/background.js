chrome.runtime.onInstalled.addListener(() => {
  console.log("Maintenance Assistant Extension Installed");
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});
