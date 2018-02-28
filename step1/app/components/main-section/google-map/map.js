import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Script from './script';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.markers = []; //markers displayed on map
        this.infoWindows = []; //infoWindows displayed on map
        this.position = this.props.mapOptions.startPosition;
        this.defaultMarkerIcon = './resources/pictures/marker-red.png';
        this.geolocalisationMarkerIcon = './resources/pictures/marker-blue.png';
        this.clickedMarkerIcon = './resources/pictures/marker-green.png';
    }

    static propTypes = {
        mapOptions: PropTypes.object,
        list: PropTypes.array,
        OnMarkerClick: PropTypes.func,
        handleMapLoad: PropTypes.func
    }

    initMap = () => {
      	this.map = new google.maps.Map(document.getElementById('map'), {
        	center: this.props.mapOptions.startPosition,
       		zoom: this.props.mapOptions.zoom
        });
        
        this.props.handleMapLoad(this.position);

        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const marker = new google.maps.Marker({
                position: pos,
                icon: this.geolocalisationMarkerIcon,
                map: this.map
            });

            this.map.setCenter(pos);
            this.props.handleMapLoad(pos);
        });
	}

	closeInfoWindows() {
        this.infoWindows.map((infoWindow) => {
            infoWindow.close();
        });
    }


	handleMarkerClick = (marker, restaurant, infoWindow) => {
        this.props.OnMarkerClick(restaurant);

        this.markers.map((marker) => {
            marker.setIcon(this.defaultMarkerIcon);
            this.closeInfoWindows();
        });

        marker.setIcon(this.clickedMarkerIcon);
        infoWindow.open(this.map, marker);
    }

	addMarker(position, restaurant) {
        const marker = new google.maps.Marker({
            position: position,
            icon: this.defaultMarkerIcon,
            map: this.map
        });

        const infoWindow = new google.maps.InfoWindow({
            content: restaurant.restaurantName
        });

        marker.addListener('click', () => {
            this.handleMarkerClick(marker, restaurant, infoWindow);
        });

        this.markers.push(marker);
        this.infoWindows.push(infoWindow);
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

	componentWillUpdate(nextProps) {
        if (nextProps.list != this.props.list) {
            this.deleteOldMarkers();
            nextProps.list.map((restaurant) => {
                const position = {lat: restaurant.lat, lng: restaurant.long};
                this.addMarker(position, restaurant);
            });
        }
	}

    render() {
        return (
        	<div>
				<Script
					src={this.props.mapOptions.src + this.props.mapOptions.apiKey}
					async={this.props.mapOptions.async}
					defer={this.props.mapOptions.defer}
					callback={this.initMap}
				/>
			</div>
        );
    }
}