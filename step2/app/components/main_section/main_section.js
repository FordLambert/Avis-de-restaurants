import React, {Component} from 'react';
import PropTypes from "prop-types";

import GoogleMap from './google_map/google_map';
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
            'canAddRestaurant': false
        };

        this.geolocCoordinates = {};
    }

    static propTypes = {
        grade: PropTypes.object,
        order: PropTypes.string
    }

    /*need to be commented*/
    getDistance(lat1, lon1, lat2, lon2) {
        const radlat1 = Math.PI * lat1/180;
        const radlat2 = Math.PI * lat2/180;
        const theta = lon1-lon2;
        const radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return dist;
    }
    /*------*/

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
            const overallGrade = this.getAverageGrade(restaurant);
            if ((overallGrade >= nextProps.grade.min) && (overallGrade <= nextProps.grade.max)) {
                newList.push(restaurant);
            }
        }.bind(this));

        //sort the newly created custom array
        //sort array by distance
        if (nextProps.order == 'distance') {

            //only available if the user have geolocation
            if (this.geolocCoordinates != undefined) {
                newList.sort(function (a, b) {
                    const distA = this.getDistance(this.geolocCoordinates.lat, this.geolocCoordinates.lng, a.lat, a.long);
                    const distB = this.getDistance(this.geolocCoordinates.lat, this.geolocCoordinates.lng, b.lat, b.long);
                    return distA - distB;
                }.bind(this));

            } else {
                console.log('Error: Géolocation must be active to use this sorting option');
            }

        //sort array by averageGrade
        } else if (nextProps.order == 'grade') {
            newList.sort(function (a, b) {
                return this.getAverageGrade(b) - this.getAverageGrade(a);
            }.bind(this));

        //handle wrong parameter
        } else {
            console.log('Error: list order must be "distance" or "grade"')
        }

        this.setState({listCustom: newList});
    }

    handleMapLoad = (geolocCoordinates) => {
        fetch('./app/data/restaurant_list.json')
            .then(result => {
                return result.json();
            })
            .then(data => {
                this.geolocCoordinates = geolocCoordinates;
                this.setState({
                    listComplete: data,
                    listCustom: data
                });
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
                    <GoogleMap
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
                        restaurantRequested={this.state.restaurantRequested}
                    />
                </div>
            </section>
        );
    }
}