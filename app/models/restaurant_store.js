export class RestaurantStore {
	constructor() {
		this.restaurantList = [];
	}

	getList() {
		return this.restaurantList;
	}

	add(restaurant) {
		this.restaurantList.push(restaurant);
	}

	getRestaurant(index) {
		return this.restaurantList[index];
	}
};

