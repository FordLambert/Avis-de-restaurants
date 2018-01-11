import React from 'react';
import ReactDOM from 'react-dom';

export class JsonManager {
	
	importJson(fileName) {
		let self = this;
		let path = 'app/data/' + fileName + '.json';
		
		/*
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
	 	*/

	 	let req = new XMLHttpRequest();
			req.open("GET", 
			path);
			// Gestion de l'événement indiquant la fin de la requête
			req.addEventListener("load", function () {
			    // Affiche la réponse reçue pour la requête
			    console.log(req.responseText);
			});
			req.send(null);
		}

	convertAndStoreJson(jsonFile, prototype, objectStore) {
		jsonFile.map(function(jsonObject) {
			let attributeList = [];

			for(var attribute in jsonObject) {
			  attributeList.push(jsonObject[attribute]);  
			}
			
			let newObject =  new(prototype).init(attributeList); //correction need to be made here
			objectStore.add(newObject);
		});
	}
};