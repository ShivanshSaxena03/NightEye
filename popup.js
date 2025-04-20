const toggle = document.getElementById("toggleNight");
const brightnessSlider = document.getElementById("brightnessSlider");
const themeSelect = document.getElementById("themeSelect");

chrome.storage.sync.get(["nightMode", "brightness", "theme"], ({ nightMode, brightness, theme }) => {
  toggle.checked = nightMode;
  brightnessSlider.value = brightness || 100;
  themeSelect.value = theme || "default";
});

toggle.addEventListener("change", () => {
  const isEnabled = toggle.checked;
  chrome.storage.sync.set({ nightMode: isEnabled });
  applyToTab(isEnabled ? "enable" : "disable");
});

brightnessSlider.addEventListener("input", () => {
  const brightness = parseInt(brightnessSlider.value);
  chrome.storage.sync.set({ brightness });
  chrome.storage.sync.get(["nightMode", "theme"], ({ nightMode, theme }) => {
    if (nightMode) applyToTab("enable", brightness, theme);
  });
});

themeSelect.addEventListener("change", () => {
  const theme = themeSelect.value;
  chrome.storage.sync.set({ theme });
  chrome.storage.sync.get(["nightMode", "brightness"], ({ nightMode, brightness }) => {
    if (nightMode) applyToTab("enable", brightness, theme);
  });
});

function applyToTab(action, brightness = parseInt(brightnessSlider.value), theme = themeSelect.value) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action, brightness, theme });
  });
}
