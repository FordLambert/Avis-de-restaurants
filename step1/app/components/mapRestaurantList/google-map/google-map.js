import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
        handleMarkerClick: PropTypes.func
    }

    handleMapLoad = (geolocCoordinates) => {
        this.props.handleMapLoad(geolocCoordinates);
    }

    handleMarkerClick = (restaurant) => {
        window.location = '#review-list';
        this.props.handleMarkerClick(restaurant);
    }

    render() {
        return (
            <div id='map'>
                <Pulser />
                <Map
                    mapOptions={this.mapOptions}
                    list={this.props.restaurantList}
                    handleMapLoad={this.handleMapLoad}
                    handleMarkerClick={this.handleMarkerClick}
                />
            </div>
        );
    }
}