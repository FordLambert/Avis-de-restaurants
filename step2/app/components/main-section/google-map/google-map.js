import React, {Component} from 'react';
import PropTypes from "prop-types";

import Map from './map';
import Pulser from './loading-pulser';

export default class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.mapOptions = {
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
            <div id={'map-container'}>
                <Pulser />
                <Map
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