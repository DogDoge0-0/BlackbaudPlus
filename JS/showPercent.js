// Initialization
let showPercentCheckbox = document.querySelector("#showPercent");

// Check if the checkbox state is stored in Chrome storage
chrome.storage.local.get("showPercent", function(data) {
  if (data.showPercent) {
    // Set the checkbox state to true
    showPercentCheckbox.checked = true;
  }
});

// Add an event listener to the checkbox to store its state when it changes
showPercentCheckbox.addEventListener("change", function() {
  chrome.storage.local.set({ "showPercent": showPercentCheckbox.checked });
  chrome.storage.local.get("showPercent", function(data) {
    if (data.showPercent) {
      // Set the checkbox state to true
      showPercentCheckbox.checked = true;
    }
  });
});
