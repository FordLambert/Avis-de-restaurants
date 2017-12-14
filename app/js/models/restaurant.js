'use strict';
const Restaurant = {
	init: function(name, adress, latitude, longitude, ratings) {
		this.name = name;
		this.adress = adress;
		this.latitude = latitude;
		this.longitude = longitude;
		this.ratings = ratings;

		return this;
	}
};

Restaurant.addRatingToList = function(rating) {
	this.ratings.push(rating);
};