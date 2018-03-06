import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Map from './Map';
import LoadingPulser from './LoadingPulser';

export default class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.map = {};

        this.mapOptions = {
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
        handleOpenReviewRequest: PropTypes.func,
        handleRestaurantAdded: PropTypes.func,
        canAddRestaurant: PropTypes.bool,
        position: PropTypes.object
    }

    handleMapUpdate = (geolocCoordinates, map) => {
        this.map = map;
        this.props.handleMapUpdate(geolocCoordinates, map);
    }

    handleOpenReviewRequest = (restaurant) => {
        window.location = '#review-list';
        this.props.handleOpenReviewRequest(restaurant);
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
            <div id={'map-container'} onMouseMove={this.onMouseHover}>
                <LoadingPulser />
                <Map
                    mapOptions={this.mapOptions}
                    markerIconsPath={this.markerIconsPath}
                    position={this.props.position}
                    list={this.props.restaurantList}
                    handleMapUpdate={this.handleMapUpdate}
                    handleOpenReviewRequest={this.handleOpenReviewRequest}
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