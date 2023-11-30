// Initialization
let showPercents = document.querySelector("#showPercent");

// Add an event listener to the dropdown to listen for changes in the selected option
showPercents.addEventListener("change", function() {
  // Get the selected option
  let showPercentSelect = showPercents.value;
  // Store the selected option in chrome.storage
  chrome.storage.local.set({ "showPercentSelect": showPercentSelect });
});

// When the page loads, retrieve the selected option from chrome.storage and set the selected option of the dropdown
window.addEventListener("load", function() {
  chrome.storage.local.get("showPercentSelect", function(result) {
    let showPercentSelect = result.showPercentSelect;
    if (showPercentSelect) {
      showPercents.value = showPercentSelect;
    }
    else {
      showPercents.value = 1;
      showPercentSelect = 1;
      chrome.storage.local.set({ "showPercentSelect": 1 });
    }
  });
});
