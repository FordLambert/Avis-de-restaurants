
export class VisualDisplayManager {
	constructor() {
		this._selectors = {
		'restaurantList': 'restaurant-list'
		}
		this.restaurantDomList = document.getElementById(this._selectors.restaurantList);
	}


	displayListInPage(restaurantList) {

		restaurantList.map(function(restaurant) {
			this.restaurantDomList.prepend(
				'<div class="restaurant"><h2>"' + restaurant.name + '"</h2><p>' + this.getStarAverage(restaurant) + '<p></div>'
			);
		}.bind(this));

	}


	//will probably not stay here
	getStarAverage(restaurant) {
		let totalStarNote = 0

		restaurant.ratings.map(function(currentRating) {

			totalStarNote = totalStarNote + currentRating.stars;

		});

		return totalStarNote / restaurant.ratings.length;
	}
};