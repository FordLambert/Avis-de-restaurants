import RestaurantListCreator from './restaurant_list_creator';
import JsonUploader from './JSON_uploader';
import JsonConverter from './JSON_converter';

export default class DataShaper {
	constructor() {
		this.restaurantListCreator = new RestaurantListCreator();
		this.jsonUploader = new JsonUploader();
		this.jsonConverter = new JsonConverter();
	}

	startApp() {
		window.onload = function() {
			this.uploadJsonData();
		}.bind(this)
		//this.watchForUpdates();
	}

	uploadJsonData() {
		this.jsonUploader.importJson('restaurant_list');

		document.addEventListener('upload-complete', function(newFile) {
			this.jsonConverter.convertAndStoreJson(
				newFile,
				this.restaurantListCreator.restaurantPrototype,
				this.restaurantListCreator.completeRestaurantList
			);
			//this.createMapWith(this.restaurantList);
			this.restaurantListCreator.dispatchListUpdate(this.restaurantListCreator.completeRestaurantList);
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
};