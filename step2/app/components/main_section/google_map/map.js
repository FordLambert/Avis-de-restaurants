import React, {Component} from 'react';
import PropTypes from "prop-types";

import Script from './script';
import AddRestaurantPopUp from './add_restaurant_popup';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'clickedPosition': {}
        };

        this.markers = []; //markers displayed on map
        this.infoWindows = []; //infoWindows displayed on map
        this.defaultMarkerIcon = './resources/pictures/marker-red.png';
        this.geolocalisationMarkerIcon = './resources/pictures/marker-blue.png';
        this.clickedMarkerIcon = './resources/pictures/marker-green.png';
    }

    static propTypes = {
        mapOptions: PropTypes.object,
        list: PropTypes.array,
        handleMapLoad: PropTypes.func,
        canAddRestaurant: PropTypes.bool,
        handleRestaurantAdded: PropTypes.func
    }

    initMap = () => {
      	this.map = new google.maps.Map(document.getElementById('map'), {
        	center: this.props.mapOptions.startPosition,
       		zoom: this.props.mapOptions.zoom
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

            this.map.addListener('mouseover', function(event) {
                if (this.props.canAddRestaurant) {
                    this.map.setOptions({draggableCursor: 'url(resources/pictures/marker-red.png), auto'});
                } else {
                    this.map.setOptions({draggableCursor: 'pointer'});
                }
            }.bind(this));

            this.map.addListener('click', function(e) {
                if (this.props.canAddRestaurant) {
                    this.setState({clickedPosition: e.latLng});
                    window.location = '#add-restaurant-popup';
                }
            }.bind(this));

			this.map.setCenter(pos);
            this.props.handleMapLoad(pos);
		}.bind(this));
	}

	closeInfoWindows() {
        this.infoWindows.map(function (infoWindow) {
            infoWindow.close();
        }.bind(this));
    }

    handleSubmit = (restaurantName) => {
        let lat = this.state.clickedPosition.lat();
        let long = this.state.clickedPosition.lng();
        let address = '';

        let geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': this.state.clickedPosition}, function(results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    address = results[1].formatted_address;
                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        });

        const newRestaurant = {};
        newRestaurant.restaurantName = restaurantName;
        newRestaurant.address = address;
        newRestaurant.lat = lat;
        newRestaurant.long = long;
        newRestaurant.ratings = [];
       this.addMarker(this.state.clickedPosition, newRestaurant);
       this.props.handleRestaurantAdded(newRestaurant);
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
                <AddRestaurantPopUp
                    handleSubmit={this.handleSubmit}
                />
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