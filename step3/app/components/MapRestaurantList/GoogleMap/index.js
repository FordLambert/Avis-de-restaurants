import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
            zoom: 13
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
        position: PropTypes.object,
        onMapClick: PropTypes.func,
        onDragEnd: PropTypes.func
    }

    componentWillUpdate(nextProps) {
        if (nextProps.restaurantList != this.props.restaurantList) {
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

        this.map.addListener('dragend', (event) => {
            this.props.onDragEnd();
        });

        this.map.addListener('zoom_changed', (event) => {
            this.props.onDragEnd();
        });

        //if in "add restaurant" mode, start the adding process on click
        this.map.addListener('click', (event) => {
            if (this.props.canAddRestaurant) {
                this.onMapClick(event.latLng);
            }
        });
    }

    onMapClick = (latLng) => {
        this.props.onMapClick(latLng);
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

    render() {
        return (
            <div id='map-container' onMouseMove={this.onMouseHover}>
                <LoadingPulser />
                <div
                    id='map'
                />
            </div>
        );
    }
}