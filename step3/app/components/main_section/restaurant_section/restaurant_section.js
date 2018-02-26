import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalWindow from './new_review_modal/modal_window';
import ReviewList from './review_list/review_list';
import RestaurantList from './restaurant_list/restaurant_list';

export default class RestaurantSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //'currentRestaurant': null,
            'userReview': null
        };
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        restaurantRequested: PropTypes.object,
        handleOpenReview: PropTypes.func,
        handleAddReview: PropTypes.func,
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
        this.props.handleOpenReview(restaurant);
    }

    handleAddReview = (restaurant) => {
        this.props.handleAddReview(restaurant);
    }

    render() {
        return (
            <div className="restaurant-section col-12">
                <ModalWindow
                    handleReviewSubmit={this.handleReviewSubmit}
                    restaurantReviewed={this.props.restaurantRequested}
                />
                <ReviewList
                    restaurant={this.props.restaurantRequested}
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