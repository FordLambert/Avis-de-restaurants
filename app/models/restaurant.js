export class Restaurant {
	constructor(array) {
		this.name = array[0];
		this.adress = array[1];
		this.latitude = array[2];
		this.longitude = array[3];
		this.ratings = array[4];
	}

	addRatingToList(rating) {
		this.ratings.push(rating);
	}
};

