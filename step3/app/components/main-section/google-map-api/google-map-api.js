import React, {Component} from 'react';
import PropTypes from "prop-types";

import Script from './script';
import AddRestaurantPopUp from './add-restaurant-popup/add-restaurant-popup';

export default class GoogleMapApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'clickedPosition': {}
        };

        this.markers = []; //markers displayed on map
        this.infoWindows = []; //infoWindows displayed on map
        this.position = this.props.position;
        this.defaultMarkerIcon = './resources/pictures/marker-red.png';
        this.geolocalisationMarkerIcon = './resources/pictures/marker-blue.png';
        this.clickedMarkerIcon = './resources/pictures/marker-green.png';
    }

    static propTypes = {
        mapOptions: PropTypes.object,
        list: PropTypes.array,
        handleMapUpdate: PropTypes.func,
        canAddRestaurant: PropTypes.bool,
        handleRestaurantAdded: PropTypes.func,
        handleOpenReview: PropTypes.func
    }

    initMap = () => {
      	this.map = new google.maps.Map(document.getElementById('map'), {
        	center: this.props.mapOptions.startPosition,
       		zoom: this.props.mapOptions.zoom
		});

        this.props.handleMapUpdate(this.position, this.map);

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
			this.props.handleMapUpdate(pos, this.map);
		});

		//style of cursor in "add restaurant" mode
        this.map.addListener('mouseover', () => {
            if (this.props.canAddRestaurant) {
                this.map.setOptions({draggableCursor: 'url(resources/pictures/marker-red.png), auto'});

            } else {
                this.map.setOptions({draggableCursor: 'pointer'});
            }
        });

        //if in "add restaurant" mode, start adding process on click
        this.map.addListener('click', (event) => {
            if (this.props.canAddRestaurant) {
                this.setState({clickedPosition: event.latLng});
                window.location = '#add-restaurant-popup';
            }
        });
	}

    handleSubmit = (restaurantName) => {
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
            newRestaurant.name = restaurantName;
            newRestaurant.vicinity = address;
            newRestaurant.geometry = {};
            newRestaurant.geometry.location = this.state.clickedPosition;
            newRestaurant.rating = 0;
            newRestaurant.reviewList = [];

            this.addMarker(this.state.clickedPosition, newRestaurant);
            this.props.handleRestaurantAdded(newRestaurant);
        });
    }

	handleMarkerClick = (marker, restaurant, infoWindow) => {
        this.props.handleOpenReview(restaurant);

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
            content: restaurant.name
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

    //set the map to display the markers (hide them if null)
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

	componentWillUpdate(nextProps) {

        if (nextProps.list != this.props.list) {
            this.map.setCenter(nextProps.position);
            this.deleteOldMarkers();

            nextProps.list.map((restaurant) => {
                const position = restaurant.geometry.location;
                this.addMarker(position, restaurant);
            });
        }
	}

    render() {
        const src = this.props.mapOptions.src + this.props.mapOptions.apiKey + this.props.mapOptions.request;

        return (
        	<div>
                <AddRestaurantPopUp
                    handleSubmit={this.handleSubmit}
                />
				<Script
					src={src}
					async={this.props.mapOptions.async}
					defer={this.props.mapOptions.defer}
					callback={this.initMap}
				/>
			</div>
        );
    }
}