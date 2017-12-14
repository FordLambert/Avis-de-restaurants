'use strict';
const Manager = {
	init: function() {
		this.restaurantStore = Object.create(RestaurantStore).init();

		return this;
	}
};

Manager.startManager = function() {
	//just testing here, not the final form at all
	this.importJson('restaurant-list');
};

Manager.importJson = function(fileName) {
	let self = this;
	let path = 'js/data/' + fileName + '.json';
	
	$.ajax({
	 	type: 'GET',
	 	url: path,

	 	success: function(result) {
	 		return self.createRestaurantList(result);
 		},

 		error : function(XMLHttpRequest, textStatus, errorThrown){
 			console.log('XHR ERROR ' + XMLHttpRequest.status);
       }
 	});
};

Manager.createRestaurantList = function(jsonFile) {

	jsonFile.map(function(jsonRestaurant) {
		let newRestaurant = Object.create(Restaurant).init(
			jsonRestaurant.restaurantName,
			jsonRestaurant.address,
			jsonRestaurant.lat,
			jsonRestaurant.long,
			jsonRestaurant.ratings
		);
		this.restaurantStore.addRestaurant(newRestaurant);
	}.bind(this));

	//debug
	console.log('Restaurant Store after .map -> ');
	console.log(this.restaurantStore.restaurantList);
};