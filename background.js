chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
      nightMode: false,
      brightness: 100,
      theme: "default"
    });
  });
  