import React, {Component} from 'react';
import PropTypes from "prop-types";

import Map from './google_map_api/map';
import RestaurantInfoMenu from './restaurant_info_menu/restaurant_info_menu';
import RestaurantSection from './restaurant_section/restaurant_section';
import ConfirmAdditionPopUp from './confirm-addition-popup/confirm_addition_popup';

export default class MainSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'listComplete': [],
            'listCustom': [],
            'restaurantRequested': {},
            'canAddRestaurant': false,
            'map': {}
        };

        this.geolocCoordinates = {};
    }

    static propTypes = {
        grade: PropTypes.object,
        order: PropTypes.string
    }

    getDistance(lat1, lon1, lat2, lon2) {
        //convert lat 1 and 2 from degree to radians
        const radlat1 = Math.PI * lat1/180;
        const radlat2 = Math.PI * lat2/180;

        //theta determine an angle between long 1 and 2
        const theta = lon1-lon2;
        //then convert it to radians
        const radtheta = Math.PI * theta/180;

        //multiply the sinus of (radians) lats, add the product of the long's (radians) cosine multiply by radtheta
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

        //dist equal the cosine arc between our points
        dist = Math.acos(dist);

        //convert it back from radians to degree
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;

        //finally convert it to kilometers
        dist = dist * 1.609344;
        return dist;
    }

    getAverageGrade(restaurant) {
        const reviewNumber = restaurant.ratings.length;
        let total = 0;

        restaurant.ratings.map(function(restaurantReview){
            total += restaurantReview.stars;
        });

        return Math.round((total/reviewNumber) * 100) / 100;
    }

    componentWillReceiveProps(nextProps) {
        //create a new custom list based on user choices (grade)
        const newList = [];
        this.state.listComplete.map(function (restaurant) {
            if ((restaurant.rating >= nextProps.grade.min) && (restaurant.rating <= nextProps.grade.max)) {
                newList.push(restaurant);
            }
        }.bind(this));

        //sort the newly created custom array
        //sort array by distance
        if (nextProps.order == 'distance') {

            //only available if the user have geolocation
            if (this.geolocCoordinates != undefined) {
                newList.sort(function (a, b) {
                    const distA = this.getDistance(
                        this.geolocCoordinates.lat,
                        this.geolocCoordinates.lng,
                        a.geometry.location.lat(),
                        a.geometry.location.lng()
                    );

                    const distB = this.getDistance(
                        this.geolocCoordinates.lat,
                        this.geolocCoordinates.lng,
                        b.geometry.location.lat(),
                        b.geometry.location.lng()
                    );

                    return distA - distB;
                }.bind(this));

            } else {
                console.log('Error: Géolocation must be active to use this sorting option');
            }

        //sort array by averageGrade
        } else if (nextProps.order == 'grade') {
            newList.sort(function (a, b) {
                return b.rating - a.rating;
            }.bind(this));

        //handle wrong parameter
        } else {
            console.log('Error: list order must be "distance" or "grade"')
        }

        this.setState({listCustom: newList});
    }

    handleMapLoad = (geolocCoordinates, restaurantList, map) => {
        this.geolocCoordinates = geolocCoordinates;
        this.setState({
            listComplete: restaurantList,
            listCustom: restaurantList,
            map: map
        });
    }

    handleOpenReview = (restaurant) => {
        this.setState({restaurantRequested: restaurant});
    }

    addRestaurant = (restaurant) => {
        const tempRestaurantList = this.state.listCustom;
        tempRestaurantList.push(restaurant);
        this.confirmRestaurantAdded();
        this.setState({
            listCustom: tempRestaurantList,
            canAddRestaurant: false
        });
    }

    confirmRestaurantAdded() {
        //open the confirmation modal for a short time
        window.location = '#confirm-addition-popup';
        setTimeout(function () {
            window.location = '#!';
        }, 1500);
    }

    toggleAddRestaurant = (status) => {
        this.setState({canAddRestaurant: status});
    }

    render() {
        return (
            <section className='col-12 col-md-9 col-xl-10 main-section' id='main-section'>
                <div className='row'>
                    <Map
                        restaurantList={this.state.listCustom}
                        handleMapLoad={this.handleMapLoad}
                        handleOpenReview={this.handleOpenReview}
                        canAddRestaurant={this.state.canAddRestaurant}
                        handleRestaurantAdded={this.addRestaurant}
                    />
                    <ConfirmAdditionPopUp />
                    <RestaurantInfoMenu
                        restaurantNumber={this.state.listCustom.length}
                        toggleAddRestaurant={this.toggleAddRestaurant}
                        canAddRestaurant={this.state.canAddRestaurant}
                    />
                    <RestaurantSection
                        restaurantList={this.state.listCustom}
                        map={this.state.map}
                    />
                </div>
            </section>
        );
    }
}