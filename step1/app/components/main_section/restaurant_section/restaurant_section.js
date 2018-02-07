import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ReviewList} from './review_list/review_list';
import RestaurantList from './restaurant_list/restaurant_list';

export default class RestaurantSection extends Component {
    constructor(props) {
        super(props);
        this.state = {'currentRestaurantRatings': []};
    }

    static propTypes = {
        restaurantList: PropTypes.array
    }

    handleOpenReview(restaurant) {
        this.setState({currentRestaurantRatings: restaurant.ratings});
    }

    render() {
        return (
            <div className="restaurant-section col-12">

                <ReviewList
                    reviewList={this.state.currentRestaurantRatings}
                />

                <RestaurantList
                    restaurantList={this.props.restaurantList}
                    handleOpenReview={this.handleOpenReview}
                />

            </div>
        );
    }
}