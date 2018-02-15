import React, {Component} from 'react';
import PropTypes from "prop-types";

import Script from './script';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.markers = [];
        this.infoWindows = [];
        this.defaultMarkerIcon = './resources/pictures/marker-red.png';
        this.geolocalisationMarkerIcon = './resources/pictures/marker-blue.png';
        this.clickedMarkerIcon = './resources/pictures/marker-green.png';
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
        list: PropTypes.array,
        handleMapLoad: PropTypes.func
    }

    initMap = () => {
      	this.map = new google.maps.Map(document.getElementById('map'), {
        	center: this.mapOptions.startPosition,
       		zoom: this.mapOptions.zoom
		});
		navigator.geolocation.getCurrentPosition(function(position) {
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
		}.bind(this));
		this.props.handleMapLoad();
	}

	closeInfoWindows() {
        this.infoWindows.map(function (infoWindow) {
            infoWindow.close();
        }.bind(this));
    }


	handleMarkerClick = (marker, restaurant, infoWindow) => {
        this.props.handleOpenReview(restaurant);
        this.markers.map(function (marker) {
            marker.setIcon(this.defaultMarkerIcon);
            this.closeInfoWindows();
        }.bind(this));
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

        marker.addListener('click', function() {
            this.handleMarkerClick(marker, restaurant, infoWindow);
        }.bind(this));
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
            nextProps.list.map(function (restaurant) {
                let position = {lat: restaurant.lat, lng: restaurant.long};
                this.addMarker(position, restaurant);
            }.bind(this));
        }
	}

    render() {
        return (
        	<div>
				<Script
					src={this.mapOptions.src + this.mapOptions.apiKey}
					async={this.mapOptions.async}
					defer={this.mapOptions.defer}
					callback={this.initMap}
				/>
			</div>
        );
    }
}