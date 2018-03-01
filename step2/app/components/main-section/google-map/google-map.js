import React, {Component} from 'react';
import PropTypes from "prop-types";

import Map from './map';
import Pulser from './loading-pulser';

export default class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.map = {};
        
        this.mapOptions = {
            startPosition: {lat: 48.853, lng: 2.35},
            zoom: 12
        }

        this.markerIconsPath = {
            defaultMarkerIcon: './resources/pictures/marker-red.png',
            geolocalisationMarkerIcon: './resources/pictures/marker-blue.png',
            clickedMarkerIcon: './resources/pictures/marker-green.png'
        }
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        handleMapLoad: PropTypes.func,
        handleOpenReview: PropTypes.func,
        handleRestaurantAdded: PropTypes.func,
        canAddRestaurant: PropTypes.bool
    }

    handleMapLoad = (geolocCoordinates, map) => {
        this.map = map;
        this.props.handleMapLoad(geolocCoordinates);
    }

    handleOpenReview = (restaurant) => {
        window.location = '#review-list';
        this.props.handleOpenReview(restaurant);
    }

    handleRestaurantAdded = (restaurant) => {
        this.props.handleRestaurantAdded(restaurant);
    }

    onMouseMove = () => {
        if (this.props.canAddRestaurant) {
            this.map.setOptions({draggableCursor: 'url(' + this.markerIconsPath.defaultMarkerIcon + '), auto'});

        } else {
            this.map.setOptions({draggableCursor: 'pointer'});
        }
    }

    render() {
        return (
            <div id={'map-container'} onMouseMove={this.onMouseMove}>
                <Pulser />
                <Map
                    mapOptions={this.mapOptions}
                    markerIconsPath={this.markerIconsPath}
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