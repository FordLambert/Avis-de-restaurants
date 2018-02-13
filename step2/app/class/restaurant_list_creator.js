import Restaurant from './restaurant';

export default class RestaurantListCreator {
	constructor() {
		this.completeRestaurantList = [];
		this.customRestaurantList = [];
		this.restaurantPrototype = Restaurant;
	}

	addRestaurantToList(restaurant, list) {
		this.list.push(restaurant);
    }
    
    getRestaurantFromList(index, list) {
        return this.list[index];
    }

    createCustomList(requiredCity, requiredGrade, requiredOrder) {
        this.completeRestaurantList.map(function(restaurant){
            let overallGrade = this.overallGradeCalculator(restaurant);
            
            if (overallGrade >= requiredGrade) {
                this.customRestaurantList.push(restaurant);
            }
        }.bind(this))

        this.dispatchListUpdate(this.customRestaurantList);
    }

    dispatchListUpdate(list) {
        let newListCreated = new CustomEvent('new-list-created', {"detail": list});
        document.dispatchEvent(newListCreated);
    }

    overallGradeCalculator(restaurant) {
        let numberOfReviews = restaurant.ratings.length;
        let totalGrade = 0;

        restaurant.ratings.map(function(restaurantReview){
            total += restaurantReview.stars;
        });

        return Math.round((total/reviewNumber) * 100) / 100;
    }
};