import React, {Component} from 'react';

import Script from './script';

export default class Map extends Component {

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

			const marker = new google.maps.Marker({
				position: pos,
				map: this.map
			});
			this.map.setCenter(pos);
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