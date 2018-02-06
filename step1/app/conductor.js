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
		window.onload = function() {
			this.uploadJsonData();
			document.addEventListener('list-updated', function(newFile) {
				this.createMapWith(this.restaurantList);
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

	createMapWith(dataList) {
		this.mapManager.initMap();
		this.mapManager.addPlacesOnMap(dataList);
	}

	dispatchListUpdate(list) {
		let restaurantList = new CustomEvent('restaurantList-updated', {"detail": list});
		document.dispatchEvent(restaurantList);
	}

	watchForUpdates() {
		document.addEventListener('submit', function(event) {
			event.preventDefault();
			let requiredCity = document.getElementById('location-input').value;
			let requiredGrade = document.getElementById('grade-input').value;
			let requiredOrder = document.getElementById('order-option').value;
			this.applyFormOptions(requiredGrade);
		}.bind(this));
	}

	applyFormOptions(requiredGrade) {
		let editedList = [];
		this.restaurantList.map(function(restaurant){
			let reviewNumber = restaurant.ratings.length;
			let total = 0;

			restaurant.ratings.map(function(restaurantReview){
				total += restaurantReview.stars;
			});
			let globalGrade = Math.round((total/reviewNumber) * 100) / 100;

			if (globalGrade >= requiredGrade) {
				editedList.push(restaurant);
			}
		}.bind(this))

		this.dispatchListUpdate(editedList);
	}
};