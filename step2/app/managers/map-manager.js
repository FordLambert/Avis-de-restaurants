export class MapManager {
	constructor() {
		this.originalLat = 45.5088400;
		this.originalLong = -73.5878100;
		this.originalZoom = 12;
		this.map = {};
		this.initMap = this.initMap.bind(this);
	}

  	initMap() {
		const originalPosition = {lat: 45.5088400, lng: -73.5878100};

      	this.map = new google.maps.Map(document.getElementById('map'), {
        	center: originalPosition,
       		zoom: 12
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

	addMarkersOnMap(position) {
		const marker = new google.maps.Marker({
			position: position,
			map: this.map
		});
	}

	addPlacesOnMap(placesList) {
		placesList.map(function(place) {
			let position = {lat:place.lat, lng:place.long};
			this.addMarkersOnMap(position);
		}.bind(this));
	}
};