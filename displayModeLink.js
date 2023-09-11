// Apply the display mode
function applyDisplayMode(displayModeSelect) {
  // Get the HTML tag
  var htmlTag = document.documentElement;

  // Remove all display mode classes
  htmlTag.classList.remove('dark-mode', 'spooky-mode');

  // Apply the selected display mode
	if (displayModeSelect === '1') {
		htmlTag.classList.add('light-mode');
		htmlTag.classList.remove('dark-mode');
		htmlTag.classList.remove('spooky-mode');
	}
  else if (displayModeSelect === '2') {
    htmlTag.classList.add('dark-mode')
		htmlTag.classList.remove('light-mode');
		htmlTag.classList.remove('spooky-mode');
  } 
	else if (displayModeSelect === '3') {
    htmlTag.classList.add('spooky-mode');
		htmlTag.classList.remove('light-mode');
		htmlTag.classList.remove('dark-mode');
  }
	else {
		alert('Changing display theme unsucessful, please send me the following error message:\n Error: displayModeSelect unidentifiable, unable to parse input.')
	}
}

// When the page loads, retrieve the selected display mode from chrome.storage and apply it
window.addEventListener("load", function() {
  chrome.storage.local.get("displayModeSelect", function(result) {
    let displayModeSelect = result.displayModeSelect;

    // Apply the display mode
    applyDisplayMode(displayModeSelect);
  });
});

// Listen for changes in chrome.storage
chrome.storage.onChanged.addListener(function(changes) {
  if (changes.displayModeSelect) {
    let displayModeSelect = changes.displayModeSelect.newValue;

    // Apply the updated display mode
    applyDisplayMode(displayModeSelect);
  }
});