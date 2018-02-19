import React, {Component} from 'react';
import PropTypes from "prop-types";

import Map from './map';
import Pulser from './loading_pulser';

export default class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.mapOptions = {
            src: 'https://maps.googleapis.com/maps/api/js',
            apiKey: '?key=AIzaSyAcJwz6_PgkDi-gLx0hoTsqoeowiwWoovc',
            async: true,
            defer: true,
            startPosition: {lat: 45.5088400, lng: -73.5878100},
            zoom: 12
        }
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        handleMapLoad: PropTypes.func,
        handleOpenReview: PropTypes.func,
        canAddRestaurant: PropTypes.bool
    }

    handleMapLoad = (geolocCoordinates) => {
        this.props.handleMapLoad(geolocCoordinates);
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
            <div id={'map'}>
                <Pulser />
                <Map
                    mapOptions={this.mapOptions}
                    list={this.props.restaurantList}
                    handleMapLoad={this.handleMapLoad}
                    handleOpenReview={this.handleOpenReview}
                    canAddRestaurant={this.props.canAddRestaurant}
                    handleRestaurantAdded={this.handleRestaurantAdded}
                />
            </div>
        );
    }
}