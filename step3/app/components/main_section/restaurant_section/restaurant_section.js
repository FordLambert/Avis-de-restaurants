import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalWindow from './new_review_modal/modal_window';
import ReviewList from './review_list/review_list';
import RestaurantList from './restaurant_list/restaurant_list';

export default class RestaurantSection extends Component {
    constructor(props) {
        super(props);
        this.state = {'currentRestaurant': {}};
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        restaurantRequested: PropTypes.object,
        map: PropTypes.object
    }

    handleReviewSubmit = (grade, review) => {
        const tempRestaurant = this.state.currentRestaurant;
        const newRating = {
            "rating":grade,
            "text":review
        }
        tempRestaurant.ratings.push(newRating);

        this.setState({currentRestaurant: tempRestaurant});
    }

    handleOpenReview = (restaurant) => {
        this.setState({currentRestaurant: restaurant});
    }

    handleAddReview = (restaurant) => {
        this.setState({currentRestaurant: restaurant});
    }

    componentWillUpdate(nextProps) {
        if (this.props.restaurantRequested != nextProps.restaurantRequested) {
            this.setState({currentRestaurant: nextProps.restaurantRequested});
        }
    }

    render() {
        return (
            <div className="restaurant-section col-12">
                <ModalWindow
                    handleReviewSubmit={this.handleReviewSubmit}
                    restaurantReviewed={this.state.currentRestaurant}
                />
                <ReviewList
                    currentRestaurant={this.state.currentRestaurant}
                />
                <RestaurantList
                    map={this.props.map}
                    restaurantList={this.props.restaurantList}
                    handleOpenReview={this.handleOpenReview}
                    handleAddReview={this.handleAddReview}
                />
            </div>
        );
    }
}