'use strict';
const Restaurant = {
	init: function(array) {
		this.name = array[0];
		this.adress = array[1];
		this.latitude = array[2];
		this.longitude = array[3];
		this.ratings = array[4];

		return this;
	}
};

Restaurant.addRatingToList = function(rating) {
	this.ratings.push(rating);
};