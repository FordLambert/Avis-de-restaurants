import React, {Component} from 'react';
import PropTypes from "prop-types";

import AddRestaurantPopUp from './AddRestaurantPopup/AddRestaurantPopup';
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

        this.state = {
            'clickedPosition': {}
        };

        this.markers = []; //markers displayed on map
        this.infoWindows = []; //infoWindows displayed on map
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        handleMapUpdate: PropTypes.func,
        handleMarkerClick: PropTypes.func,
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
    handleNewNameSubmit = (restaurantName) => {
        const lat = this.state.clickedPosition.lat();
        const long = this.state.clickedPosition.lng();
        let address = '';

        const geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': this.state.clickedPosition}, (results, status) => {
            if (status === 'OK') {

                if (results[1]) {
                    address = results[0].formatted_address;

                } else {
                    console.log('No results found');
                }

            } else {
                console.log('Geocoder failed due to: ' + status);
            }

            const newRestaurant = {};
            newRestaurant.restaurantName = restaurantName;
            newRestaurant.address = address;
            newRestaurant.lat = lat;
            newRestaurant.long = long;
            newRestaurant.ratings = [];

            this.addMarker(this.state.clickedPosition, newRestaurant);
            this.props.handleRestaurantAdded(newRestaurant);
        });
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
            if (this.props.canAddRestaurant) {
                this.setState({
                    clickedPosition: event.latLng
                });
                window.location = '#add-restaurant-popup';
            }
        });
    }

    render() {
        return (
            <div id='map-container' onMouseMove={this.onMouseHover}>
                <Pulser />
                <AddRestaurantPopUp
                    handleNewNameSubmit={this.handleNewNameSubmit}
                />
                <div
                    id='map'
                />
            </div>
        );
    }
}