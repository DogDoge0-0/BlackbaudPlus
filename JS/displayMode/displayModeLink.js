// Apply the display mode
function applyDisplayMode(displayModeSelect) {
  // Get the HTML tag
  var htmlTag = document.documentElement;

  // Apply the selected display mode
	if (displayModeSelect == 1) {
		htmlTag.classList.add('light-mode');
		htmlTag.classList.remove('dark-mode');
		htmlTag.classList.remove('spooky-mode');
	}
  else if (displayModeSelect == 2) {
    htmlTag.classList.add('dark-mode')
    htmlTag.classList.remove('light-mode');
		htmlTag.classList.remove('spooky-mode');
  } 
	else if (displayModeSelect == 3) {
    htmlTag.classList.add('spooky-mode');
		htmlTag.classList.remove('light-mode');
		htmlTag.classList.remove('dark-mode');
  }
	else {
		alert('Changing display theme unsucessful, please send me the following error message:\nError: displayModeSelect unidentifiable, unable to parse input.');
	}
}

// Listen for changes in chrome.storage
chrome.storage.onChanged.addListener(function(changes) {
  if (changes.displayModeSelect) {
    let displayModeSelect = changes.displayModeSelect.newValue;
    // Apply the updated display mode
    applyDisplayMode(displayModeSelect);
  }
});
window.addEventListener('load', function() {
    chrome.storage.local.get("displayModeSelect", function(data) {
        let displayModeSelect = data.displayModeSelect;
        applyDisplayMode(displayModeSelect);
    });
});
