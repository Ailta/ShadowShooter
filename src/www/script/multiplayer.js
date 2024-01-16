function myFunc() {
	const text = "hi";
	
    fetch('/addNumStat', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text })
	})
}