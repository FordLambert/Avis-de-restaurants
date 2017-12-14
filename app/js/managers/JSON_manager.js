'use strict';
const JsonManager = {
	init: function() {
		return this;
	}
};

JsonManager.importJson = function(fileName) {
	let self = this;
	let path = 'js/data/' + fileName + '.json';
	
	$.ajax({
	 	type: 'GET',
	 	url: path,

	 	success: function(result) {
	 		$(document).trigger('upload-complete', [result]);
 		},

 		error : function(XMLHttpRequest, textStatus, errorThrown){
 			console.log('JSON import Error : ' + XMLHttpRequest.status);
       }
 	});
};

JsonManager.convertAndStoreJson = function(jsonFile, prototype, objectStore) {

	jsonFile.map(function(jsonObject) {
		let attributeList = [];

		for(var attribute in jsonObject) {
		  attributeList.push(jsonObject[attribute]);  
		}
		
		let newObject =  Object.create(prototype).init(attributeList);
		objectStore.add(newObject);
	});
};