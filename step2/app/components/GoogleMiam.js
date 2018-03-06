import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Navigation from './Navigation/Navigation';
import MapRestaurantList from './MapRestaurantList/MapRestaurantList';

class GoogleMiam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'listComplete': [],
            'listCustom': [],
            'position': {},
            'restaurantRequested': {},
            'canAddRestaurant': false
        };
    }

    getDistance(lat1, lon1, lat2, lon2) {
        //convert lat 1 and 2 from degree to radians
        const radlat1 = Math.PI * lat1/180;
        const radlat2 = Math.PI * lat2/180;

        //theta determine an angle between long 1 and 2
        const theta = lon1-lon2;
        //then convert it to radians
        const radtheta = Math.PI * theta/180;

        //multiply the sinus of (radians) lats, add the product of the long's (radians) cosine multiply by radtheta
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

        //dist equal the cosine arc between our points
        dist = Math.acos(dist);

        //convert it back from radians to degree
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;

        //finally convert it to kilometers
        dist = dist * 1.609344;
        return dist;
    }

    getAverageGrade(restaurant) {
        const reviewNumber = restaurant.ratings.length;
        let total = 0;
        let finalGrade = 0;

        if (reviewNumber > 0) {
            
            restaurant.ratings.map(function(restaurantReview) {
                total += restaurantReview.stars;
            });

            finalGrade = Math.round((total/reviewNumber) * 100) / 100;

        }
        return finalGrade;
    }

    addRestaurant = (restaurant) => {
        const tempRestaurantList = this.state.listCustom;
        tempRestaurantList.push(restaurant);
        this.confirmRestaurantAdded();
        this.setState({
            listComplete: tempRestaurantList,
            canAddRestaurant: false
        });
    }

    confirmRestaurantAdded() {
        //open the confirmation modal for a short time
        window.location = '#confirm-addition-popup';
        setTimeout(function () {
            window.location = '#!';
        }, 1500);
    }

    toggleAddRestaurant = (status) => {
        this.setState({
            canAddRestaurant: status
        });
    }

    handleUserChoicesSubmit = (grade, order) => {
        //create a new custom list based on user choices (grade)
        const newList = [];
        this.state.listComplete.map((restaurant) => {
            const overallGrade = this.getAverageGrade(restaurant);

            if ((overallGrade >= grade.min) && (overallGrade <= grade.max)) {
                newList.push(restaurant);
            
            //we want the newly created restaurant with no review to appear
            } else if ((grade.min == 0) && (overallGrade == 0)) {
                newList.push(restaurant);
            }
        });

        //sort the newly created custom array
        //sort array by distance
        if (order == 'distance') {
            newList.sort((a, b) => {
                const distA = this.getDistance(this.state.position.lat, this.state.position.lng, a.lat, a.long);
                const distB = this.getDistance(this.state.position.lat, this.state.position.lng, b.lat, b.long);
                return distA - distB;
            });

        //sort array by averageGrade
        } else if (order == 'grade') {

            newList.sort((a, b) => {
                return this.getAverageGrade(b) - this.getAverageGrade(a);
            });

        //handle wrong parameter
        } else {
            console.log('Error: list order must be "distance" or "grade"')
        }

        this.setState({
            listCustom: newList
        });
    }

    handleMapUpdate = (geolocCoordinates) => {
        fetch('./app/data/restaurant-list.json')
            .then(result => {
                return result.json();
            })
            .then(data => {
                this.setState({
                    listComplete: data,
                    listCustom: data,
                    position: geolocCoordinates
                });
            });
    }

    handleMarkerClick = (restaurant) => {
        this.setState({
            restaurantRequested: restaurant
        });
    }

    render() {
        return (
            <div className='row'>
                <Navigation
                    handleUserChoicesSubmit={this.handleUserChoicesSubmit}
                />
                <MapRestaurantList
                    handleMapUpdate={this.handleMapUpdate}
                    handleMarkerClick={this.handleMarkerClick}
                    addRestaurant={this.addRestaurant}
                    restaurantRequested={this.state.restaurantRequested}
                    restaurantList={this.state.listCustom}
                    canAddRestaurant={this.state.canAddRestaurant}
                    toggleAddRestaurant={this.toggleAddRestaurant}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <GoogleMiam />,
    document.getElementById('page-wrapper')
);