import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ReviewList from './review_list/review_list';
import RestaurantList from './restaurant_list/restaurant_list';

export default class RestaurantSection extends Component {
    constructor(props) {
        super(props);
        this.state = {'currentRestaurant': {}};
    }

    static propTypes = {
        restaurantList: PropTypes.array
    }

    handleOpenReview = (restaurant) => {
        this.setState({currentRestaurant: restaurant});
    }

    render() {
        return (
            <div className="restaurant-section col-12">

                <ReviewList
                    currentRestaurant={this.state.currentRestaurant}
                />

                <RestaurantList
                    restaurantList={this.props.restaurantList}
                    handleOpenReview={this.handleOpenReview}
                />

            </div>
        );
    }
}