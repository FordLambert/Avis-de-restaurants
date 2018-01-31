export class Initializer {
  constructor() {
    this.originalLat = 45.5088400;
    this.originalLong = -73.5878100;
    this.originalZoom = 12;

    window.onload = this.initMap;
	}

  initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.5088400, lng: -73.5878100},
        zoom: 12
      });
      var infoWindow = new google.maps.InfoWindow({map: map});

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Position trouvée.');
          map.setCenter(pos);
        }, function() {
          this.handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, infoWindow, map.getCenter());
      }
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
  }
}