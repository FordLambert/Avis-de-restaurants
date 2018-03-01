import React, {Component} from 'react';
import PropTypes from "prop-types";

import GoogleMap from './google-map/google-map';
import RestaurantInfoMenu from './restaurant-info-menu/restaurant-info-menu';
import RestaurantSection from './restaurant-section/restaurant-section';
import ConfirmAdditionPopUp from './confirm-addition-popup/confirm-addition-popup';

export default class MainSection extends Component {
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

    static propTypes = {
        city: PropTypes.string,
        grade: PropTypes.object,
        order: PropTypes.string
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

    componentWillReceiveProps(nextProps) {
        //If we want another position, start by updating the latLng
        if ((nextProps.city != null) && (nextProps.city != this.props.city)) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': nextProps.city}, (results, status) => {
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

                                console.log(results);

                            this.setState({
                                listComplete: results
                            });
                            this.sortCustomList(nextProps);
                        }
                    });
                }
            });

        } else {
            this.sortCustomList(nextProps);
        }
    }

    sortCustomList(nextProps) {
        const newListCustom = [];
        //Update the new custom list based on user choices (grade)
        this.state.listComplete.map((restaurant) => {
            if ((restaurant.rating >= nextProps.grade.min) && (restaurant.rating <= nextProps.grade.max)) {
                newListCustom.push(restaurant);

            //we want the newly created restaurant with no review to appear
            } else if ((nextProps.grade.min == 0) && (restaurant.rating == 0)) {
                newListCustom.push(restaurant);
            }
        });

        //sort the newly created custom array
        //sort array by distance
        if (nextProps.order == 'distance') {
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
        } else if (nextProps.order == 'grade') {
            newListCustom.sort((a, b) => {
                return b.rating - a.rating;
            });

            //handle wrong parameter
        } else {
            console.log('Error: list order must be "distance" or "grade"')
        }

        this.setState({listCustom: newListCustom});
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

    handleOpenReview = (restaurant) => {
        this.setState({restaurantRequested: restaurant});
    }

    handleAddReview = (restaurant) => {
        this.setState({restaurantRequested: restaurant});
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
        this.setState({canAddRestaurant: status});
    }

    render() {
        return (
            <section className='col-12 col-md-9 col-xl-10 main-section' id='main-section'>
                <div className='row'>
                    <GoogleMap
                        restaurantList={this.state.listCustom}
                        position={this.state.position}
                        handleMapUpdate={this.handleMapUpdate}
                        handleOpenReview={this.handleOpenReview}
                        canAddRestaurant={this.state.canAddRestaurant}
                        handleRestaurantAdded={this.addRestaurant}
                    />
                    <ConfirmAdditionPopUp />
                    <RestaurantInfoMenu
                        restaurantList={this.state.listCustom}
                        toggleAddRestaurant={this.toggleAddRestaurant}
                        canAddRestaurant={this.state.canAddRestaurant}
                    />
                    <RestaurantSection
                        restaurantList={this.state.listCustom}
                        restaurantRequested={this.state.restaurantRequested}
                        handleOpenReview={this.handleOpenReview}
                        handleAddReview={this.handleAddReview}
                        map={this.state.map}
                    />
                </div>
            </section>
        );
    }
}