import React, {Component} from 'react';
import PropTypes from "prop-types";

import Map from './Map';
import Pulser from './LoadingPulser';

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
        handleMapUpdate: PropTypes.func,
        handleOpenReviewRequest: PropTypes.func,
        handleRestaurantAdded: PropTypes.func,
        canAddRestaurant: PropTypes.bool
    }

    handleMapUpdate = (geolocCoordinates, map) => {
        this.map = map;
        this.props.handleMapUpdate(geolocCoordinates);
    }

    handleMarkerClick = (restaurant) => {
        window.location = '#review-list';
        this.props.handleMarkerClick(restaurant);
    }

    handleRestaurantAdded = (restaurant) => {
        this.props.handleRestaurantAdded(restaurant);
    }

    onMouseHover = () => {
        if (this.props.canAddRestaurant) {
            this.map.setOptions({draggableCursor: 'url(' + this.markerIconsPath.defaultMarkerIcon + '), auto'});

        } else {
            this.map.setOptions({draggableCursor: 'pointer'});
        }
    }

    render() {
        return (
            <div id='map-container' onMouseMove={this.onMouseHover}>
                <Pulser />
                <Map
                    mapOptions={this.mapOptions}
                    markerIconsPath={this.markerIconsPath}
                    placesList={this.props.restaurantList}
                    handleMapUpdate={this.handleMapUpdate}
                    handleMarkerClick={this.handleMarkerClick}
                    canAddRestaurant={this.props.canAddRestaurant}
                    handleRestaurantAdded={this.handleRestaurantAdded}
                />
                <div
                    id='map'
                />
            </div>
        );
    }
}