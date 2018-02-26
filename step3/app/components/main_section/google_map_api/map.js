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
            zoom: 12
        }
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        handleMapLoad: PropTypes.func,
        handleOpenReview: PropTypes.func,
        handleRestaurantAdded: PropTypes.func,
        canAddRestaurant: PropTypes.bool,
        position: PropTypes.object
    }

    handleMapUpdate = (geolocCoordinates, map) => {
        this.props.handleMapUpdate(geolocCoordinates, map);
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
                    position={this.props.position}
                    list={this.props.restaurantList}
                    handleMapUpdate={this.handleMapUpdate}
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