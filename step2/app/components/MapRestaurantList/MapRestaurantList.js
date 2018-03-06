import React, {Component} from 'react';
import PropTypes from "prop-types";

import GoogleMap from './GoogleMap/GoogleMap';
import RestaurantInfoMenu from './RestaurantInfoMenu/RestaurantInfoMenu';
import RestaurantSection from './RestaurantSection/RestaurantSection';
import ConfirmAdditionPopUp from './ConfirmAdditionPopup/ConfirmAdditionPopup'; 

export default class MapRestaurantList extends Component {

    static propTypes = {
        handleMapUpdate: PropTypes.func,
        handleMarkerClick: PropTypes.func,
        addRestaurant: PropTypes.func,
        restaurantList: PropTypes.array,
        restaurantRequested: PropTypes.object,
        canAddRestaurant: PropTypes.bool,
        toggleAddRestaurant: PropTypes.func
    }

    toggleAddRestaurant = (status) => {
        this.props.toggleAddRestaurant(status);
    }

    addRestaurant = (restaurant) => {
        this.props.addRestaurant(restaurant);
    }

    handleMapUpdate = (geolocCoordinates) => {
       this.props.handleMapUpdate(geolocCoordinates);
    }

    handleMarkerClick = (restaurant) => {
        this.props.handleMarkerClick(restaurant);
    }

    render() {
        return (
            <section className='col-12 col-md-9 col-xl-10 main-section' id='main-section'>
                <div className='row'>
                    <GoogleMap
                        restaurantList={this.props.restaurantList}
                        handleMapUpdate={this.handleMapUpdate}
                        handleMarkerClick={this.handleMarkerClick}
                        canAddRestaurant={this.props.canAddRestaurant}
                        handleRestaurantAdded={this.addRestaurant}
                    />
                    <ConfirmAdditionPopUp />
                    <RestaurantInfoMenu
                        restaurantNumber={this.props.restaurantList.length}
                        toggleAddRestaurant={this.toggleAddRestaurant}
                        canAddRestaurant={this.props.canAddRestaurant}
                    />
                    <RestaurantSection
                        restaurantList={this.props.restaurantList}
                        restaurantRequested={this.props.restaurantRequested}
                    />
                </div>
            </section>
        );
    }
}