import React, {Component} from 'react';

import AddRestaurantPopUp from './AddRestaurantPopup';
import Navigation from './Navigation';
import MapRestaurantList from './MapRestaurantList';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'listComplete': [],
            'listCustom': [],
            'position': {lat: 48.853, lng: 2.35}, //Paris by default
            'restaurantRequested': null,
            'canAddRestaurant': false
        };

        this.map = {}; //updated by handleMapUpdate
        this.clickedPosition = {};
        this.city = {};
        this.grade = {min: 0, max: 5};
        this.order = 'grade';
    }

    handleMapUpdate = (geolocCoordinates, map) => {
        const request = {
            location: geolocCoordinates,
            radius: '5000', //meters
            types: ['restaurant'],
            minPriceLevel: 0
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status, pagination) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {

                this.map = map;
                this.setState({
                    listComplete: results,
                    listCustom: results,
                    position: geolocCoordinates
                });
            }
        });
    }

    handleAddReviewRequest = (restaurant) => {
        this.setState({
            restaurantRequested: restaurant
        });
    }

    handleOpenReviewRequest = (restaurant) => {
        this.setState({
            restaurantRequested: restaurant
        });
    }

    //handle the form's submit for custom restaurant options
    handleUserChoicesSubmit = (city, newGrade, newOrder) => {
        this.grade = newGrade;
        this.order = newOrder;

        //If we want another position, start by updating the latLng
        if ((city != undefined) && (city != this.city)) {
            this.city = city;
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode( { 'address': this.city}, (results, status) => {
                if (status == 'OK') {
                    const lat = results[0].geometry.location.lat();
                    const lng = results[0].geometry.location.lng();
                    const newPosition = {lat, lng};
    
                    this.map.setCenter(newPosition);
                    this.setState({
                        position: newPosition
                    });
    
                    this.generateListFromPosition();
                }
            });

        } else {
            this.getVisiblesRestaurantsOnly();
        }
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
            newRestaurant.name = restaurantName;
            newRestaurant.vicinity = address;
            newRestaurant.geometry = {};
            newRestaurant.geometry.location = this.clickedPosition;
            newRestaurant.rating = 0;
            newRestaurant.reviewList = [];

            this.addRestaurantToList(newRestaurant);
        });
    }

    onMapClick = (latLng) => {
        this.clickedPosition = latLng;
        window.location = '#add-restaurant-popup';
    }

    onDragEnd = () => {
        this.setState({
            position: this.map.center
        });
        this.generateListFromPosition();
    }

    getVisiblesRestaurantsOnly = () => {
        const visibleRestaurantsList = [];
        
        this.state.listComplete.map((restaurant) => {

            if (this.map.getBounds().contains(restaurant.geometry.location)) {
                visibleRestaurantsList.push(restaurant)
            }
        });

        this.generateNewCustomList(visibleRestaurantsList);
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

    addRestaurantToList = (restaurant) => {
        const tempRestaurantList = this.state.listComplete;
        tempRestaurantList.push(restaurant);
        this.confirmRestaurantAdded();
        this.setState({
            listComplete: tempRestaurantList,
            canAddRestaurant: false
        });
        this.getVisiblesRestaurantsOnly();;
    }

    toggleAddRestaurant = (status) => {
        this.setState({
            canAddRestaurant: status
        });
    }

    confirmRestaurantAdded() {
        //open the confirmation modal for a short time
        window.location = '#confirm-addition-popup';
        setTimeout(function () {
            window.location = '#!';
        }, 1500);
    }

    generateNewCustomList = (restaurantList) => {
        const newListCustom = [];
        
        //Update the new custom list based on user choices (grade)
        restaurantList.map((restaurant) => {
            if ((restaurant.rating >= this.grade.min) && (restaurant.rating <= this.grade.max)) {
                newListCustom.push(restaurant);

            //google places restaurant with no ratings needs a special rule
            } else if ((this.grade.min == 0) && (restaurant.rating == undefined)) {
                restaurant.rating = 0;
                newListCustom.push(restaurant);
            }
        });

        //sort the newly created custom array
        //sort array by distance
        if (this.order == 'distance') {

            newListCustom.sort((a, b) => {
                const distA = this.getDistance(
                    this.state.position.lat,
                    this.state.position.lng,
                    a.geometry.location.lat(),
                    a.geometry.location.lng()
                );

                const distB = this.getDistance(
                    this.state.position.lat,
                    this.state.position.lng,
                    b.geometry.location.lat(),
                    b.geometry.location.lng()
                );

                return distA - distB;
            });

        //sort array by averageGrade
        } else if (this.order == 'grade') {

            newListCustom.sort((a, b) => {
                return b.rating - a.rating;
            });

        //handle wrong parameter
        } else {
            console.log('Error: list order must be "distance" or "grade"');
        }

        this.setState({
            listCustom: newListCustom
        });
    }

    generateListFromPosition = () => {
        const request = {
            location: this.state.position,
            radius: '5000', //meters
            types: ['restaurant'],
            minPriceLevel: 0
        };

        const service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch(request, (results, status) => {

            if (status == google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    listComplete: results
                });
                this.getVisiblesRestaurantsOnly();
            }
        });
    }

    render() {
        return (
            <div className='row'>
                <AddRestaurantPopUp
                    handleSubmit={this.onNewRestaurantNameSubmit}
                />
                <Navigation
                    handleUserChoicesSubmit={this.handleUserChoicesSubmit}
                />
                <MapRestaurantList
                    handleAddReviewRequest={this.handleAddReviewRequest}
                    handleOpenReviewRequest={this.handleOpenReviewRequest}
                    handleMapUpdate={this.handleMapUpdate}
                    toggleAddRestaurant={this.toggleAddRestaurant}
                    restaurantList={this.state.listCustom}
                    position={this.state.position}
                    map={this.map}
                    canAddRestaurant={this.state.canAddRestaurant}
                    restaurantRequested={this.state.restaurantRequested}
                    onMapClick={this.onMapClick}
                    onDragEnd={this.onDragEnd}
                />
            </div>
        );
    }
}