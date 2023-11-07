// Mutation detection
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		// Check if relevant HTML has been added
		if (mutation.type === 'childList' && mutation.target.className === 'assignment-detail-status-label') {
			// Apply grade calculation and update title
			applyGrade();
		}
	});
});

observer.observe(document.body, { childList: true, subtree: true });

// Function to apply grade calculation and update title
function applyGrade() {
	console.log('yo');
	chrome.storage.local.get('letterTooltipChecked', function(result) {
		let letterTooltipCheckedValue = result.letterTooltipChecked;
		if (letterTooltipCheckedValue == true) {
			console.log('yo wasssup');
			// Extract the text content of the grade element
			let gradeText = document.querySelector('.assignment-detail-status-label').textContent;

			// Search for numbers using a specific pattern
			let match = gradeText.match(/Graded: ([0-9.]+) of ([0-9.]+)/);

			// Calculate the percent of the grade
			let grade1 = parseFloat(match[1]);
			let grade2 = parseFloat(match[2]);
			let gradeFinal = grade1 / grade2 * 100;

			// Add grade conversion to A <> F
			function convertToLetterGrade(gradeFinal) {
				if (gradeFinal >= 93) {
					return 'A';
				} else if (gradeFinal >= 90) {
					return 'A-';
				} else if (gradeFinal >= 87) {
					return 'B+';
				} else if (gradeFinal >= 83) {
					return 'B';
				} else if (gradeFinal >= 80) {
					return 'B-';
				} else if (gradeFinal >= 77) {
					return 'C+';
				} else if (gradeFinal >= 73) {
					return 'C';		
				} else if (gradeFinal >= 70) {
					return 'C-';
				} else if (gradeFinal >= 67) {
					return 'D+';
				} else if (gradeFinal >= 63) {
					return 'D';
				} else if (gradeFinal >= 60) {
					return 'D-';
				} else {
					return 'F';
				}
			}
			let letterGrade = convertToLetterGrade(gradeFinal);
			// Set the title of the element
			document.querySelector('.assignment-detail-status-label').title = "This is an: "+letterGrade;
		}
	}
		,)
}
