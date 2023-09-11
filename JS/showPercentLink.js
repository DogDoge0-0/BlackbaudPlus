let originalText, percentText, grade;

window.addEventListener("load", insertPercent);
window.addEventListener("popstate", insertPercent);

function insertPercent() {
	console.log('Code Injected!');
	// Store the current URL
	let currentUrl = window.location.href;

	// Check if URL contains "assignmentdetail"
	if (currentUrl.indexOf('assignmentdetail') !== -1) {

		// Watch for changes to the DOM
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {

				// Check if relevant HTML has been added
				if (mutation.type === 'childList' && mutation.target.className === 'assignment-detail-status-label') {
					console.log('Mutation Detected');
					// Apply grade calculation and event listeners
					applyGrade();
				}
			});
		});

		// Start observing the DOM
		observer.observe(document.body, { childList: true, subtree: true });

		// Function to apply grade calculation and event listeners
		function applyGrade() {
			chrome.storage.local.get('showPercent', function(result) {
				if (result.showPercent === true) {
					if (!percentText) {
						grade = document.querySelector('.assignment-detail-status-label');
						let gradeText = grade.textContent; // Extract the text content

						// Search for numbers using a specific pattern
						let match = gradeText.match(/Graded: ([0-9.]+) of ([0-9.]+)/);
						let grade1 = parseFloat(match[1]);
						let grade2 = parseFloat(match[2]);
						let gradeFinal = grade1 / grade2 * 100;
						console.log('First Num: ' + grade1);
						console.log('Second Num: ' + grade2);
						console.log('Final Num: ' + gradeFinal);
						// Store the original and modified text content of the grade element
						originalText = grade.textContent;
						if (Math.abs(gradeFinal - Math.round(gradeFinal)) < 0.000001) {
							percentText = ' Graded: ' + gradeFinal.toFixed(0) + '%';
							console.log('YEP!');
						}
						else if (Math.round(gradeFinal) === gradeFinal) {
							percentText = ' Graded: ' + gradeFinal.toFixed(0) + '%';
							console.log('MAYBE!');
						}
						else {
							percentText = ' Graded: ' + gradeFinal.toFixed(2) + '%';
							console.log('NOPE!');
						}
					}
					// Display the grade
					grade.addEventListener('mouseover', function() {
						grade.textContent = percentText;
					});

					grade.addEventListener('mouseout', function() {
						grade.textContent = originalText;
					});

				}
			});
		}

		// Call applyGrade() function once in case the relevant HTML is already present
		applyGrade();
	}

	// Watch for changes to the URL
	window.addEventListener('hashchange', function() {
		// If the URL has changed, clear the variables
		if (window.location.href !== currentUrl) {
			currentUrl = window.location.href;
			originalText = null;
			gradeFinal = null;
			percentText = null;
		}
	});
}
chrome.storage.local.get('showPercent', function(result) {

  // Add event listener for changes to showPercent
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ('showPercent' in changes) {
      // Reload the page
      location.reload();
    }
  });
});
