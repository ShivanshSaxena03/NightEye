function applyTheme(theme = "default", brightness = 100) {
    removeNightMode();
  
    const style = document.createElement('style');
    style.id = 'nightguard-style';
  
    let css = `
      html {
        filter: brightness(${brightness}%);
        transition: all 0.3s ease;
      }
      body, div, p, h1, h2, h3, h4, h5, h6, span, a, li, button, input, textarea {
        transition: all 0.3s ease;
      }
      img, video {
        filter: brightness(${brightness + 20}%);
        transition: all 0.3s ease;
      }
    `;
  
    switch (theme) {
      case "sepia":
        css += `
          html {
            background-color: #f4ecd8 !important;
            color: #5b4636 !important;
          }
        `;
        break;
      case "navy":
        css += `
          html {
            background-color: #0b1c2c !important;
            color: #b0c7d1 !important;
          }
        `;
        break;
      default:
        css += `
          html {
            background-color: #121212 !important;
            color: #dcdcdc !important;
          }
        `;
    }
  
    style.textContent = css;
    document.head.appendChild(style);
  }
  
  function removeNightMode() {
    const existing = document.getElementById('nightguard-style');
    if (existing) existing.remove();
  }
  
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "enable") applyTheme(msg.theme, msg.brightness);
    if (msg.action === "disable") removeNightMode();
  });
  
  // Apply settings from storage when the extension loads
  chrome.storage.sync.get(["nightMode", "brightness", "theme"], ({ nightMode, brightness, theme }) => {
    if (nightMode) applyTheme(theme, brightness);
  });
  