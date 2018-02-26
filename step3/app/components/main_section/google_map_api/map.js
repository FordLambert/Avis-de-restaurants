import React, {Component} from 'react';
import PropTypes from "prop-types";

import GoogleMapApi from './google_map_api';
import Pulser from './loading_pulser';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.mapOptions = {
            src: 'https://maps.googleapis.com/maps/api/js',
            apiKey: '?key=' + 'AIzaSyDNUGo0UwN5UI3gEYYLRlzdS-Rm53HMr_g',
            request: '&' + 'libraries=places',
            async: true,
            defer: true,
            startPosition: {lat: 48.853, lng: 2.35},
            zoom: 12
        }
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        handleMapLoad: PropTypes.func,
        handleOpenReview: PropTypes.func,
        handleRestaurantAdded: PropTypes.func,
        canAddRestaurant: PropTypes.bool
    }

    handleMapLoad = (geolocCoordinates, restaurantList, map) => {
        this.props.handleMapLoad(geolocCoordinates, restaurantList, map);
    }

    handleOpenReview = (restaurant) => {
        window.location = '#review-list';
        this.props.handleOpenReview(restaurant);
    }

    handleRestaurantAdded = (restaurant) => {
        this.props.handleRestaurantAdded(restaurant);
    }

    render() {
        return (
            <div id={'map-container'}>
                <Pulser />
                <GoogleMapApi
                    mapOptions={this.mapOptions}
                    list={this.props.restaurantList}
                    handleMapLoad={this.handleMapLoad}
                    handleOpenReview={this.handleOpenReview}
                    canAddRestaurant={this.props.canAddRestaurant}
                    handleRestaurantAdded={this.handleRestaurantAdded}
                />
                <div
                    id={'map'}
                />
            </div>
        );
    }
}