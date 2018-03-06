import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddRestaurantPopUp from './AddRestaurantPopup/AddRestaurantPopup';

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
        list: PropTypes.array,
        handleMapUpdate: PropTypes.func,
        canAddRestaurant: PropTypes.bool,
        handleRestaurantAdded: PropTypes.func,
        handleOpenReviewRequest: PropTypes.func
    }

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

	OnMarkerClick = (marker, restaurant, infoWindow) => {
        this.props.handleOpenReviewRequest(restaurant);

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
    
    componentDidMount() {
        //act as an initMap callback
        this.map = new google.maps.Map(document.getElementById('map'), {
        	center: this.props.position,
       		zoom: this.props.mapOptions.zoom
		});

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
        	<div>
                <AddRestaurantPopUp
                    handleSubmit={this.handleNewNameSubmit}
                />
			</div>
        );
    }
}