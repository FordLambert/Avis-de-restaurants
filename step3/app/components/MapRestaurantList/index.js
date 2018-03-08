import React, {Component} from 'react';
import PropTypes from 'prop-types';

import GoogleMap from './GoogleMap';
import RestaurantInfoMenu from './RestaurantInfoMenu';
import RestaurantSection from './RestaurantSection';
import ConfirmAdditionPopUp from './ConfirmAdditionPopup';

export default class MapRestaurantList extends Component {

    static propTypes = {
        handleAddReviewRequest: PropTypes.func,
        handleOpenReviewRequest: PropTypes.func,
        handleMapUpdate: PropTypes.func,
        toggleAddRestaurant: PropTypes.func,
        restaurantList: PropTypes.array,
        position: PropTypes.object,
        map: PropTypes.object,
        canAddRestaurant: PropTypes.bool,
        restaurantRequested: PropTypes.object,
        onMapClick: PropTypes.func,
        onDragEnd: PropTypes.func
    }

    handleMapUpdate = (geolocCoordinates, map) => {
       this.props.handleMapUpdate(geolocCoordinates, map);
    }

    handleOpenReviewRequest = (restaurant) => {
        this.props.handleOpenReviewRequest(restaurant);
    }

    handleAddReviewRequest = (restaurant) => {
        this.props.handleAddReviewRequest(restaurant);
    }

    onMapClick = (latLng) => {
        this.props.onMapClick(latLng);
    }

    toggleAddRestaurant = (status) => {
        this.props.toggleAddRestaurant(status);
    }

    render() {
        return (
            <section className='col-12 col-md-9 col-xl-10 main-section' id='main-section'>
                <div className='row'>
                    <GoogleMap
                        map={this.props.map}
                        restaurantList={this.props.restaurantList}
                        position={this.props.position}
                        handleMapUpdate={this.handleMapUpdate}
                        handleMarkerClick={this.handleOpenReviewRequest}
                        canAddRestaurant={this.props.canAddRestaurant}
                        handleRestaurantAdded={this.addRestaurant}
                        onMapClick={this.onMapClick}
                        onDragEnd={this.props.onDragEnd}
                    />
                    <ConfirmAdditionPopUp />
                    <RestaurantInfoMenu
                        restaurantList={this.props.restaurantList}
                        toggleAddRestaurant={this.toggleAddRestaurant}
                        canAddRestaurant={this.props.canAddRestaurant}
                    />
                    <RestaurantSection
                        restaurantList={this.props.restaurantList}
                        restaurantRequested={this.props.restaurantRequested}
                        handleOpenReviewRequest={this.handleOpenReviewRequest}
                        handleAddReviewRequest={this.handleAddReviewRequest}
                        map={this.props.map}
                    />
                </div>
            </section>
        );
    }
}