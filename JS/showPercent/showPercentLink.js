let originalText, percentText, grade;

window.addEventListener("load", insertPercent);
window.addEventListener("popstate", insertPercent);

function insertPercent() {
	// Store the current URL
	let currentUrl = window.location.href;

	// Check if URL contains "assignmentdetail"
	if (currentUrl.indexOf('assignmentdetail') !== -1) {

		// Watch for changes to the DOM
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {

				// Check if relevant HTML has been added
				if (mutation.type === 'childList' && mutation.target.className === 'assignment-detail-status-label') {
					// Apply grade calculation and event listeners
					applyGrade();
				}
			});
		});

		// Start observing the DOM
		observer.observe(document.body, { childList: true, subtree: true });

		// Function to apply grade calculation and event listeners
		function applyGrade() {
			if (!percentText) {
				grade = document.querySelector('.assignment-detail-status-label');
				console.log(grade)
				let gradeText = grade.textContent; // Extract the text content

				// Search for numbers using a specific pattern
				let match = gradeText.match(/Graded: ([0-9.]+) of ([0-9.]+)/);
				let grade1 = parseFloat(match[1]);
				let grade2 = parseFloat(match[2]);
				let gradeFinal = grade1 / grade2 * 100;
				// Store the original and modified text content of the grade element
				originalText = grade.textContent;
				if (Math.abs(gradeFinal - Math.round(gradeFinal)) < 0.000001) {
					percentText = ' Graded: ' + gradeFinal.toFixed(0) + '%';
				}
				else if (Math.round(gradeFinal) === gradeFinal) {
					percentText = ' Graded: ' + gradeFinal.toFixed(0) + '%';
				}
				else {
					percentText = ' Graded: ' + gradeFinal.toFixed(2) + '%';
				}
			}
			// Display the grade
			chrome.storage.local.get('showPercentSelect', function(result) {
				let showPercentSelectValue = result.showPercentSelect;

				if (showPercentSelectValue == 1) {
				}
				else if (showPercentSelectValue == 2) {
					grade.addEventListener('mouseover', function() {
						grade.textContent = percentText;
					});

					grade.addEventListener('mouseout', function() {
						grade.textContent = originalText;
					});
				}
				else if (showPercentSelectValue == 3) {
					grade.textContent = percentText;
				}
				else {
					alert('Grade Percent Converter unsuccessful, please send me the following error message:\nError: showPercentSelect unidentifiable, unable to parse input.');
					return;
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
chrome.storage.local.get('showPercent', function() {

	// Add event listener for changes to showPercent
	chrome.storage.onChanged.addListener(function(changes) {
		if ('showPercentSelect' in changes) {
			// Reload the page
			location.reload();
		}
	});
});
