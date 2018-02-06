import {RestaurantListCreator} from './restaurant_list_creator';
import {JsonUploader} from './JSON_uploader';
import {JsonConverter} from './JSON_converter';
//import {MapManager} from './map-manager';

export class DataShaper {
	constructor() {
		this.restaurantListCreator = new RestaurantListCreator();
		this.jsonUploader = new JsonUploader();
		this.jsonConverter = new JsonConverter();
		//this.mapManager = new MapManager();
	}

	startApp() {
		window.onload = function() {
			this.uploadJsonData();
			document.addEventListener('list-updated', function(newFile) {
				//this.createMapWith(this.restaurantList);
			}.bind(this));
		}.bind(this)
		this.watchForUpdates();
	}

	uploadJsonData() {
		this.jsonManager.importJson('restaurant_list');

		document.addEventListener('upload-complete', function(newFile) {
			this.jsonManager.convertAndStoreJson(newFile, this.restaurantPrototype, this.restaurantList);
			this.createMapWith(this.restaurantList);
			this.dispatchListUpdate(this.restaurantList);
		}.bind(this));
	}

	watchForUpdates() { //not the good name, watch for form submit
		document.addEventListener('submit', function(event) {
			event.preventDefault();
			let requiredCity = document.getElementById('location-input').value;
			let requiredGrade = document.getElementById('grade-input').value;
			let requiredOrder = document.getElementById('order-option').value;
			this.applyFormOptions(requiredGrade);
		}.bind(this));
	}

	/*
	createMapWith(dataList) {
		this.mapManager.initMap();
		this.mapManager.addPlacesOnMap(dataList);
	}
	*/
};