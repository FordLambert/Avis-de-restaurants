import {Restaurant} from './models/restaurant';
import {JsonManager} from './managers/JSON_manager';
import {MapManager} from './managers/map-manager';

export class Conductor {
	constructor() {
		this.restaurantPrototype = Restaurant;
		this.restaurantList = [];

		this.jsonManager = new JsonManager();
		this.mapManager = new MapManager();
	}

	startApp() {
		this.uploadJsonData();
		document.addEventListener('list-updated', function(newFile) {
			this.createMapWith(this.restaurantList);
		}.bind(this));
	}

	uploadJsonData() {
		this.jsonManager.importJson('restaurant_list');
		document.addEventListener('upload-complete', function(newFile) {
			this.jsonManager.convertAndStoreJson(newFile, this.restaurantPrototype, this.restaurantList);
			this.createMapWith(this.restaurantList);
		}.bind(this));
	}

	createMapWith(dataList) {
		this.mapManager.initMap();
		this.mapManager.addPlacesOnMap(dataList);
	}
};