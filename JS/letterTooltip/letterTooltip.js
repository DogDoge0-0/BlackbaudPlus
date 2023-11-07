// Initialization
let letterTooltipCheckbox = document.querySelector("#letterTooltip");
chrome.storage.local.set({ "letterTooltipChecked": false });
// Add an event listener to the checkbox to listen for changes in the checked state
letterTooltipCheckbox.addEventListener("change", function() {
  // Get the checked state
  let letterTooltipChecked = letterTooltipCheckbox.checked;
  // Store the checked state in chrome.storage
  chrome.storage.local.set({ "letterTooltipChecked": letterTooltipChecked });
});

// When the page loads, retrieve the checked state from chrome.storage and set the checked state of the checkbox
window.addEventListener("load", function() {
  chrome.storage.local.get("letterTooltipChecked", function(result) {
    let letterTooltipChecked = result.letterTooltipChecked;
    if (letterTooltipChecked) {
      letterTooltipCheckbox.checked = true;
    } else {
      letterTooltipCheckbox.checked = false;
    }
  });
});
