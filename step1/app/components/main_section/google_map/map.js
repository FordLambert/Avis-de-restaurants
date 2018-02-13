import React, {Component} from 'react';
import PropTypes from "prop-types";

import Script from './script';

export default class Map extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        list: PropTypes.array
    }

    markers = [];

    mapOptions = {
    	src: 'https://maps.googleapis.com/maps/api/js',
		apiKey: '?key=AIzaSyAcJwz6_PgkDi-gLx0hoTsqoeowiwWoovc',
		async: true,
		defer: true,
		startPosition: {lat: 45.5088400, lng: -73.5878100},
		zoom: 12
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
			this.addMarker(pos);
			this.map.setCenter(pos);
		}.bind(this));
	}

	addMarker(position) {
        const marker = new google.maps.Marker({
            position: position,
            map: this.map
        });
        this.markers.push(marker);
	}

    deleteMarkers() {
        this.setMapOnAll(null);
        this.markers.splice(1);
    }

    setMapOnAll(map) {
        for (let i = 1; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

	componentWillUpdate() {
        this.deleteMarkers();
	}

	componentDidUpdate() {
        this.props.list.map(function (restaurant) {
            let position = {lat: restaurant.lat, lng: restaurant.long};
            this.addMarker(position);
        }.bind(this));
    }
    
    render() {
        return (
			<Script
				src={this.mapOptions.src + this.mapOptions.apiKey}
				async={this.mapOptions.async}
				defer={this.mapOptions.defer}
				callback={this.initMap}
			/>
        );
    }
}