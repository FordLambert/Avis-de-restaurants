import React, {Component} from 'react';
import PropTypes from "prop-types";

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
        handleMapUpdate: PropTypes.func,
        handleMarkerClick: PropTypes.func,
        handleMapClick: PropTypes.func,
        handleRestaurantAdded: PropTypes.func,
        canAddRestaurant: PropTypes.bool
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
            this.handleMarkerClick(marker, restaurant, infoWindow);
        });
        this.markers.push(marker);
        this.infoWindows.push(infoWindow);
	}

    deleteOldMarkers() {
        this.setMapOnAll(null);
        this.markers.splice(1);
    }

    //set the map to display the markers (hide them if map == null)
    setMapOnAll(map) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    closeInfoWindows() {
        this.infoWindows.map((infoWindow) => {
            infoWindow.close();
        });
    }

    /*----- to be trnasformed/moved -----*/
    onMapClick = (latitude, longitude) => {
        this.props.handleMapClick(latitude, longitude);        
    }
    /*----- -----*/

    handleMarkerClick = (marker, restaurant, infoWindow) => {
        this.props.handleMarkerClick(restaurant);
        window.location = '#review-list';

        //reset the others markers before changing the clicked one
        this.markers.map((marker) => {
            marker.setIcon(this.markerIconsPath.defaultMarkerIcon);
            this.closeInfoWindows();
        });

        marker.setIcon(this.markerIconsPath.clickedMarkerIcon);
        infoWindow.open(this.map, marker);
    }

    onMouseHover = () => {
        if (this.props.canAddRestaurant) {
            this.map.setOptions({draggableCursor: 'url(' + this.markerIconsPath.defaultMarkerIcon + '), auto'});

        } else {
            this.map.setOptions({draggableCursor: 'pointer'});
        }
    }

    componentWillUpdate(nextProps) {
        //if (nextProps.restaurantList != this.props.restaurantList) {
            this.deleteOldMarkers();

            nextProps.restaurantList.map((restaurant) => {
                const position = {lat: restaurant.lat, lng: restaurant.long};
                this.addMarker(position, restaurant);
            });
        //}
    }
    
    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('map'), {
        	center: this.mapOptions.startPosition,
       		zoom: this.mapOptions.zoom
        });

        this.props.handleMapUpdate(this.mapOptions.startPosition, this.map);
        
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

            this.props.handleMapUpdate(pos, this.map);
            this.map.setCenter(pos);
		});

        //if in "add restaurant" mode, start adding process on click
        this.map.addListener('click', (event) => {
            const clickedPosition = event.latLng;
            const latitude = clickedPosition.lat();
            const longitude = clickedPosition.lng();
            if (this.props.canAddRestaurant) {
               this.onMapClick(latitude, longitude)
            }
        });
    }

    render() {
        return (
            <div id='map-container' onMouseMove={this.onMouseHover}>
                <Pulser />
                <div
                    id='map'
                />
            </div>
        );
    }
}