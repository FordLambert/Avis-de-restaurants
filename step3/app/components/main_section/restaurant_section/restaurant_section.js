import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalWindow from './new_review_modal/modal_window';
import ReviewList from './review_list/review_list';
import RestaurantList from './restaurant_list/restaurant_list';

export default class RestaurantSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'currentRestaurant': null,
            'userReview': null
        };
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        restaurantRequested: PropTypes.object,
        map: PropTypes.object
    }

    handleReviewSubmit = (grade, text) => {
        const newReview = {
            "rating": grade,
            "text": text
        }

        this.setState({userReview: newReview});
    }

    handleOpenReview = (restaurant) => {
        this.setState({currentRestaurant: restaurant});
    }

    handleAddReview = (restaurant) => {
        this.setState({currentRestaurant: restaurant});
    }

    render() {
        return (
            <div className="restaurant-section col-12">
                <ModalWindow
                    handleReviewSubmit={this.handleReviewSubmit}
                    restaurantReviewed={this.state.currentRestaurant}
                />
                <ReviewList
                    restaurant={this.state.currentRestaurant}
                    userReview={this.state.userReview}
                    map={this.props.map}
                />
                <RestaurantList
                    restaurantList={this.props.restaurantList}
                    handleOpenReview={this.handleOpenReview}
                    handleAddReview={this.handleAddReview}
                />
            </div>
        );
    }
}