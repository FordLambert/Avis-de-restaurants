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
            'position': {lat: 48.853, lng: 2.35}, //Paris by default
            'restaurantRequested': null,
            'canAddRestaurant': false,
            'map': {}
        };
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

    sortCustomList(grade, order) {
        const newListCustom = [];
        //Update the new custom list based on user choices (grade)
        this.state.listComplete.map((restaurant) => {
            if ((restaurant.rating >= grade.min) && (restaurant.rating <= grade.max)) {
                newListCustom.push(restaurant);
            }
        });

        //sort the newly created custom array
        //sort array by distance
        if (order == 'distance') {
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
        } else if (order == 'grade') {
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

    handleOpenReviewRequest = (restaurant) => {
        this.setState({
            restaurantRequested: restaurant
        });
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

                this.setState({
                    listComplete: results,
                    listCustom: results,
                    map: map,
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

    //handle the form's submit for custom restaurant options
    handleUserChoicesSubmit = (city, grade, order) => {
        //If we want another position, start by updating the latLng
        if (city != undefined) {
            const geocoder = new google.maps.Geocoder();

            //get  altLng with the user's address input
            geocoder.geocode( { 'address': city}, (results, status) => {
                if (status == 'OK') {
                    const lat = results[0].geometry.location.lat();
                    const lng = results[0].geometry.location.lng();
                    const newPosition = {lat, lng};

                    this.setState({
                        position: newPosition
                    });

                    const request = {
                        location: this.state.position,
                        radius: '5000', //meters
                        types: ['restaurant'],
                        minPriceLevel: 0
                    };

                    const service = new google.maps.places.PlacesService(this.state.map);
                    service.nearbySearch(request, (results, status) => {

                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            this.setState({
                                listComplete: results
                            });
                            this.sortCustomList(grade, order);
                        }
                    });
                }
            });

        } else {
            this.sortCustomList(grade, order);
        }
    }

    render() {
        return (
            <div className='row'>
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
                    map={this.state.map}
                    canAddRestaurant={this.state.canAddRestaurant}
                    restaurantRequested={this.state.restaurantRequested}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <GoogleMiam />,
    document.getElementById('page-wrapper')
);