import React, {Component} from 'react';
import PropTypes from "prop-types";

import GoogleMap from './GoogleMap';
import RestaurantInfoMenu from './RestaurantInfoMenu';
import RestaurantSection from './RestaurantSection';
import ConfirmAdditionPopUp from './ConfirmAdditionPopup'; 

export default class MapRestaurantList extends Component {

    static propTypes = {
        handleMapUpdate: PropTypes.func,
        handleMarkerClick: PropTypes.func,
        handleMapClick: PropTypes.func,
        addRestaurant: PropTypes.func,
        restaurantList: PropTypes.array,
        restaurantRequested: PropTypes.object,
        canAddRestaurant: PropTypes.bool,
        toggleAddRestaurant: PropTypes.func,
        onDragEnd: PropTypes.func
    }

    handleMapUpdate = (geolocCoordinates, map) => {
        this.props.handleMapUpdate(geolocCoordinates, map);
     }
 
     handleMarkerClick = (restaurant) => {
         this.props.handleMarkerClick(restaurant);
     }
 
     handleMapClick = (latitude, longitude) => {
         this.props.handleMapClick(latitude, longitude);
     }

    toggleAddRestaurant = (status) => {
        this.props.toggleAddRestaurant(status);
    }

    addRestaurant = (restaurant) => {
        this.props.addRestaurant(restaurant);
    }

    render() {
        return (
            <section className='col-12 col-md-9 col-xl-10 main-section' id='main-section'>
                <div className='row'>
                    <GoogleMap
                        restaurantList={this.props.restaurantList}
                        handleMapUpdate={this.handleMapUpdate}
                        handleMarkerClick={this.handleMarkerClick}
                        handleMapClick={this.handleMapClick}
                        canAddRestaurant={this.props.canAddRestaurant}
                        handleRestaurantAdded={this.addRestaurant}
                        onDragEnd={this.props.onDragEnd}
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