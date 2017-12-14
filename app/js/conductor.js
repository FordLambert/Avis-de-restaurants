'use strict';
const Conductor = {
	init: function() {
		this.restaurantStore = Object.create(RestaurantStore).init();

		this.jsonManager = Object.create(JsonManager).init();
		this.visualDisplayManager = Object.create(VisualDisplayManager).init();

		return this;
	}
};

Conductor.start = function() {
	//just testing here, not the final form at all (and not final name)
	this.handleJsonUploads();

	this.jsonManager.importJson('restaurant_list');
	
	this.visualDisplayManager.displayObjectsAsList(this.restaurantStore);
};

Conductor.handleJsonUploads = function() {

	let prototypeToUse = Restaurant;
	let storeToUse = this.restaurantStore;

	$(document).on('upload-complete', function(event, newFile) {
		this.jsonManager.convertAndStoreJson(newFile, prototypeToUse, storeToUse);
	}.bind(this));
};

