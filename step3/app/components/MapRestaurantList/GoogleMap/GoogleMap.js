import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddRestaurantPopUp from './AddRestaurantPopup/AddRestaurantPopup';
import LoadingPulser from './LoadingPulser';

export default class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'clickedPosition': {}
        };

        this.markers = []; //markers displayed on map
        this.infoWindows = []; //infoWindows displayed on map

        this.mapOptions = {
            zoom: 12
        }

        this.markerIconsPath = {
            defaultMarkerIcon: './resources/pictures/marker-red.png',
            geolocalisationMarkerIcon: './resources/pictures/marker-blue.png',
            clickedMarkerIcon: './resources/pictures/marker-green.png'
        }
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        handleMapLoad: PropTypes.func,
        handleMarkerClick: PropTypes.func,
        handleRestaurantAdded: PropTypes.func,
        canAddRestaurant: PropTypes.bool,
        position: PropTypes.object
    }

    /*----- to be replaced/moved -----*/
    handleNewNameSubmit = (placeName) => {
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

            const newPlace = {};
            newPlace.name = placeName;
            newPlace.vicinity = address;
            newPlace.geometry = {};
            newPlace.geometry.location = this.state.clickedPosition;
            newPlace.rating = 0;
            newPlace.reviewList = [];

            this.addMarker(this.state.clickedPosition, newPlace);
            this.props.handleRestaurantAdded(newPlace);
        });
    }
    /*----- -----*/

    addMarker(position, restaurant) {
        const marker = new google.maps.Marker({
            position: position,
            icon: this.markerIconsPath.defaultMarkerIcon,
            map: this.map
        });

        const infoWindow = new google.maps.InfoWindow({
            content: restaurant.name
        });

        marker.addListener('click', () => {
            this.OnMarkerClick(marker, restaurant, infoWindow);
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

    OnMarkerClick = (marker, restaurant, infoWindow) => {
        this.props.handleMarkerClick(restaurant);
        window.location = '#review-list';

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
            this.map.setCenter(nextProps.position);
            this.deleteOldMarkers();

            nextProps.restaurantList.map((restaurant) => {
                const position = restaurant.geometry.location;
                this.addMarker(position, restaurant);
            });
        }
    }
    
    componentDidMount() {
        //act as an initMap callback
        this.map = new google.maps.Map(document.getElementById('map'), {
        	center: this.props.position,
       		zoom: this.mapOptions.zoom
		});

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

        //in case geoloc failed/is refused
        }, () => {
            this.props.handleMapUpdate(this.props.position, this.map);
        });

        //if in "add restaurant" mode, start the adding process on click
        this.map.addListener('click', (event) => {
            if (this.props.canAddRestaurant) {
                this.setState({clickedPosition: event.latLng});
                window.location = '#add-restaurant-popup';
            }
        });
    }

    render() {
        return (
            <div id='map-container' onMouseMove={this.onMouseHover}>
                <LoadingPulser />
                <AddRestaurantPopUp
                    handleSubmit={this.handleNewNameSubmit}
                />
                <div
                    id='map'
                />
            </div>
        );
    }
}