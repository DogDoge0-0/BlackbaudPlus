// Listen for the popup to send a message
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Check if the message is to get the HTML content of the current tab
  if (request.action === 'getHtmlContent') {
    // Get the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      // Get the HTML content of the current tab
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'document.documentElement.innerHTML' },
        function(result) {
          // Send the HTML content back to the popup
          sendResponse(result[0]);
        }
      );
    });

    // Return true to indicate that sendResponse will be used asynchronously
    return true;
  }
});
