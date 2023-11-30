// Initialization
let displayModes = document.querySelector("#displayMode");

// Add an event listener to the dropdown to listen for changes in the selected option
displayModes.addEventListener("change", function() {
  // Get the selected option
  let displayModeSelect = displayModes.value;
  // Store the selected option in chrome.storage
  chrome.storage.local.set({ "displayModeSelect": displayModeSelect });
});

// When the page loads, retrieve the selected option from chrome.storage and set the selected option of the dropdown
window.addEventListener("load", function() {
  chrome.storage.local.get("displayModeSelect", function(result) {
    if (result.displayModeSelect) {
      displayModes.value = result.displayModeSelect;
    }
    else {
      displayModes.value = 1;
      chrome.storage.local.set({ "displayModeSelect": 1 });
    }
  });
});
