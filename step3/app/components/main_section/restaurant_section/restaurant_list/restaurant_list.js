import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Restaurant from './restaurant';
import Placeholder from './placeholder';

export default class RestaurantList extends Component {
    static propTypes = {
        restaurantList: PropTypes.array,
        handleOpenReview: PropTypes.func,
        handleAddReview: PropTypes.func,
        map: PropTypes.object
    }

    chooseRenderComponent(restaurantList) {
        if (restaurantList != undefined) {

            return restaurantList.map(function(restaurant, index){
                return <Restaurant
                    key={index}
                    id={index}
                    handleOpenReview={this.handleOpenReview}
                    handleAddReview={this.handleAddReview}
                    restaurant={restaurant}
                    map={this.props.map}
                />;
            }.bind(this))

        } else {
            return <Placeholder />
        }
    }

    handleOpenReview = (restaurant) => {
        /*
        const request = {
            placeId: restaurant.place_id
        };

        const service = new google.maps.places.PlacesService(this.props.map);
        service.getDetails(request, function(place, status) {

            if (status == google.maps.places.PlacesServiceStatus.OK) {
                this.props.handleOpenReview(place);
            } else {
                console.log('Error: failed to load restaurant details');
            }
        }.bind(this));
        */
        console.log('handleOpenReview est désactivé pour le moment');
    }

    handleAddReview = (restaurant) => {
        this.props.handleAddReview(restaurant);
    }

    render() {
        return (
            <div className={'restaurant-list'}>
                <ul className={'row justify-content-center justify-content-lg-start'}>
                    {this.chooseRenderComponent(this.props.restaurantList)}
                </ul>
            </div>
        )
    }
}