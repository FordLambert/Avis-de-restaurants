export class JsonConverter {
	
	importJson(fileName) {
		let path = 'app/data/' + fileName + '.json';
	 	let req = new XMLHttpRequest();
		req.open("GET", 
		path);

		req.addEventListener('load', function () {
			const uploadComplete = new CustomEvent('upload-complete', {"detail": req.responseText});
			document.dispatchEvent(uploadComplete);
		});
		req.send(null);
	}
};