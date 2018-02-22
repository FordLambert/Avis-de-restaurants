import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class GooglePlaceDetails extends Component {
    constructor(props) {
        super(props);

        this.mapOptions = {
            src: 'https://maps.googleapis.com/maps/api/js',
            apiKey: '?key=' + 'AIzaSyAcJwz6_PgkDi-gLx0hoTsqoeowiwWoovc',
            request: '&' + 'libraries=places',
            async: true,
            defer: true,
            startPosition: {lat: 45.5088400, lng: -73.5878100},
            zoom: 12
        }
    }

    static propTypes = {
        handleDetails: PropTypes.func,
        placeId: PropTypes.string,
        map: PropTypes.object
    }

    componentWillMount() {
        const request = {
            placeId: this.props.placeId
        };

        const service = new google.maps.places.PlacesService(this.props.map);
        service.getDetails(request, function (place, status) {
            console.log('Google place details status:')
            console.log(status);
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                this.handleDetails(place);
            }
        }.bind(this));
    }

    handleDetails = (restaurant) => {
        this.props.handleDetails(restaurant);
    }

    render() {
        return (
            null
        );
    }
}