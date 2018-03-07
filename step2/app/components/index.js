import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import AddRestaurantPopUp from './AddRestaurantPopup';
import Navigation from './Navigation';
import MapRestaurantList from './MapRestaurantList';

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

        this.clickedPosition = {};
        this.grade = {};
        this.order = '';
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

    addRestaurantToList = (restaurant) => {
        const tempRestaurantList = this.state.listComplete;
        tempRestaurantList.push(restaurant);
        this.confirmRestaurantAdded();
        this.setState({
            listComplete: tempRestaurantList,
            canAddRestaurant: false
        });
        this.generateNewCustomList();
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

    generateNewCustomList = () => {
         //create a new custom list based on user choices (grade)
         const newList = [];
         this.state.listComplete.map((restaurant) => {
             const overallGrade = this.getAverageGrade(restaurant);
 
             if ((overallGrade >= this.grade.min) && (overallGrade <= this.grade.max)) {
                 newList.push(restaurant);
             
             //we want the newly created restaurant with no review to appear
             } else if ((this.grade.min == 0) && (overallGrade == 0)) {
                 newList.push(restaurant);
             }
         });
 
         //sort the newly created custom array
         //sort array by distance
         if (this.order == 'distance') {
             newList.sort((a, b) => {
                 const distA = this.getDistance(this.state.position.lat, this.state.position.lng, a.lat, a.long);
                 const distB = this.getDistance(this.state.position.lat, this.state.position.lng, b.lat, b.long);
                 return distA - distB;
             });
 
         //sort array by averageGrade
         } else if (this.order == 'grade') {
 
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

    handleUserChoicesSubmit = (newGrade, newOrder) => {
        this.grade = newGrade;
        this.order = newOrder;
        this.generateNewCustomList();
    }

    onNewRestaurantNameSubmit = (restaurantName) => {
        let address = '';

        const geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': this.clickedPosition}, (results, status) => {
            if (status === 'OK') {
 
                if (results[1]) {
                    address = results[0].formatted_address;
 
                } else {
                    console.log('No results found');
                }
 
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
 
            const newRestaurant = {};
            newRestaurant.restaurantName = restaurantName;
            newRestaurant.address = address;
            newRestaurant.lat = this.clickedPosition.lat;
            newRestaurant.long = this.clickedPosition.lng;
            newRestaurant.ratings = [];
 
            this.addRestaurantToList(newRestaurant);
        });
    }

    handleMapClick = (latitude, longitude) => {
        this.clickedPosition = {lat: latitude, lng: longitude};
        window.location = '#add-restaurant-popup';
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
                <AddRestaurantPopUp
                    onNewRestaurantNameSubmit={this.onNewRestaurantNameSubmit}
                />  
                <Navigation
                    handleUserChoicesSubmit={this.handleUserChoicesSubmit}
                />
                <MapRestaurantList
                    handleMapUpdate={this.handleMapUpdate}
                    handleMarkerClick={this.handleMarkerClick}
                    handleMapClick={this.handleMapClick}
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