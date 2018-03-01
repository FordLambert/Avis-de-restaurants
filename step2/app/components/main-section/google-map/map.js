import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddRestaurantPopUp from './add-restaurant-popup/add-restaurant-popup';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'clickedPosition': {}
        };

        this.markers = []; //markers displayed on map
        this.infoWindows = []; //infoWindows displayed on map
    }

    static propTypes = {
        mapOptions: PropTypes.object,
        markerIconsPath: PropTypes.object,
        placesList: PropTypes.array,
        handleMapUpdate: PropTypes.func,
        canAddRestaurant: PropTypes.bool,
        handleRestaurantAdded: PropTypes.func,
        handleOpenReview: PropTypes.func
    }

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

	handleMarkerClick = (marker, restaurant, infoWindow) => {
        this.props.handleOpenReview(restaurant);

        //reset the others markers before changing the clicked one
        this.markers.map((marker) => {
            marker.setIcon(this.props.markerIconsPath.defaultMarkerIcon);
            this.closeInfoWindows();
        });

        marker.setIcon(this.props.markerIconsPath.clickedMarkerIcon);
        infoWindow.open(this.map, marker);
    }

	addMarker(position, restaurant) {
        const marker = new google.maps.Marker({
            position: position,
            icon: this.props.markerIconsPath.defaultMarkerIcon,
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

	componentWillUpdate(nextProps) {
        if (nextProps.placesList != this.props.placesList) {
            this.deleteOldMarkers();

            nextProps.placesList.map((restaurant) => {
                const position = {lat: restaurant.lat, lng: restaurant.long};
                this.addMarker(position, restaurant);
            });
        }
    }
    
    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('map'), {
        	center: this.props.mapOptions.startPosition,
       		zoom: this.props.mapOptions.zoom
        });
        
        this.props.handleMapUpdate(this.props.mapOptions.startPosition, this.map);

		navigator.geolocation.getCurrentPosition((position) => {
			const pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
            const marker = new google.maps.Marker({
                position: pos,
                icon: this.props.markerIconsPath.geolocalisationMarkerIcon,
                map: this.map
            });

			this.map.setCenter(pos);
            this.props.handleMapUpdate(pos, this.map);
		});

        //if in "add restaurant" mode, start adding process on click
        this.map.addListener('click', (event) => {
            if (this.props.canAddRestaurant) {
                this.setState({clickedPosition: event.latLng});
                window.location = '#add-restaurant-popup';
            }
        });
    }

    render() {
        return (
            <AddRestaurantPopUp
                handleNewNameSubmit={this.handleNewNameSubmit}
            />
        );
    }
}