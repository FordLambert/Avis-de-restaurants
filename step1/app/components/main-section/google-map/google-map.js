import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Map from './map';
import Pulser from './loading-pulser';

export default class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.mapOptions = {
            src: 'https://maps.googleapis.com/maps/api/js',
            apiKey: '?key=' + 'AIzaSyAcJwz6_PgkDi-gLx0hoTsqoeowiwWoovc',
            async: true,
            defer: true,
            startPosition: {lat: 48.853, lng: 2.35},
            zoom: 12
        }
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        handleMapLoad: PropTypes.func,
        OnMarkerClick: PropTypes.func
    }

    handleMapLoad = (geolocCoordinates) => {
        this.props.handleMapLoad(geolocCoordinates);
    }

    OnMarkerClick = (restaurant) => {
        window.location = '#review-list';
        this.props.OnMarkerClick(restaurant);
    }

    render() {
        return (
            <div id={'map'}>
                <Pulser />
                <Map
                    mapOptions={this.mapOptions}
                    list={this.props.restaurantList}
                    handleMapLoad={this.handleMapLoad}
                    OnMarkerClick={this.OnMarkerClick}
                />
            </div>
        );
    }
}