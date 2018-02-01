export class JsonManager {
	
	importJson(fileName) {
		let path = 'app/data/' + fileName + '.json';
	 	let req = new XMLHttpRequest();
		req.open("GET", 
		path);

		req.addEventListener('load', function () {
			setTimeout(function () {
				const uploadComplete = new CustomEvent('upload-complete', {"detail": req.responseText});
				document.dispatchEvent(uploadComplete);
			}, 900);
		});
		req.send(null);
	}

	convertAndStoreJson(object, prototype, objectList) {
		const jsonData = JSON.parse(object.detail);
		console.log(jsonData);

		jsonData.map(function(jsonObject) {

			let attributeList = [];

			for(let attribute in jsonObject) {
			  attributeList.push(jsonObject[attribute]);  
			}
			
			let newObject =  new prototype(attributeList);
			objectList.push(newObject);
		});
		const listUpdated = new CustomEvent('list-updated');
		document.dispatchEvent(listUpdated);
	}
};