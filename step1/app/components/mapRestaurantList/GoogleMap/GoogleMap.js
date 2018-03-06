import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Pulser from './LoadingPulser';

export default class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.mapOptions = {
            startPosition: {lat: 48.853, lng: 2.35},
            zoom: 12
        }

        this.markerIconsPath = {
            defaultMarkerIcon: './resources/pictures/marker-red.png',
            geolocalisationMarkerIcon: './resources/pictures/marker-blue.png',
            clickedMarkerIcon: './resources/pictures/marker-green.png'
        }

        this.markers = []; //markers displayed on map
        this.infoWindows = []; //infoWindows displayed on map
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        handleMapLoad: PropTypes.func,
        handleMarkerClick: PropTypes.func
    }

    addMarker(position, restaurant) {
        const marker = new google.maps.Marker({
            position: position,
            icon: this.markerIconsPath.defaultMarkerIcon,
            map: this.map
        });

        const infoWindow = new google.maps.InfoWindow({
            content: restaurant.restaurantName
        });

        marker.addListener('click', () => {
            this.onMarkerClick(marker, restaurant, infoWindow);
        });

        this.markers.push(marker);
        this.infoWindows.push(infoWindow);
	}

	closeInfoWindows() {
        this.infoWindows.map((infoWindow) => {
            infoWindow.close();
        });
    }

    deleteOldMarkers() {
        this.setMapOnAll(null);
        this.markers.splice(1);
    }

    setMapOnAll(map) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    onMarkerClick = (marker, restaurant, infoWindow) => {
        this.props.handleMarkerClick(restaurant);
        window.location = '#review-list';

        this.markers.map((marker) => {
            marker.setIcon(this.markerIconsPath.defaultMarkerIcon);
            this.closeInfoWindows();
        });

        marker.setIcon(this.markerIconsPath.clickedMarkerIcon);
        infoWindow.open(this.map, marker);
    }

    handleMapLoad = (geolocCoordinates) => {
        this.props.handleMapLoad(geolocCoordinates);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.restaurantList != this.props.restaurantList) {
            this.deleteOldMarkers();
            nextProps.restaurantList.map((restaurant) => {
                const position = {lat: restaurant.lat, lng: restaurant.long};
                this.addMarker(position, restaurant);
            });
        }
    }
    
    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('map'), {
        	center: this.mapOptions.startPosition,
       		zoom: this.mapOptions.zoom
        });

        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const marker = new google.maps.Marker({
                position: pos,
                icon: this.markerIconsPath.geolocalisationMarkerIcon,
                map: this.map
            });

            this.map.setCenter(pos);
            this.handleMapLoad(pos);
        });
    }

    render() {
        return (
            <div id='map'>
                <Pulser />
            </div>
        );
    }
}