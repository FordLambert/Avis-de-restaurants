import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalWindow from './NewReviewModal';
import ReviewList from './ReviewList';
import RestaurantList from './RestaurantList';

export default class RestaurantSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'userReview': null
        };
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        restaurantRequested: PropTypes.object,
        handleOpenReviewRequest: PropTypes.func,
        handleAddReviewRequest: PropTypes.func,
        map: PropTypes.object
    }

    handleReviewSubmit = (grade, text) => {
        const newReview = {
            'rating': grade,
            'text': text
        }

        this.setState({
            userReview: newReview
        });
    }

    handleOpenReviewRequest = (restaurant) => {
        this.props.handleOpenReviewRequest(restaurant);
    }

    handleAddReviewRequest = (restaurant) => {
        this.props.handleAddReviewRequest(restaurant);
    }

    render() {
        return (
            <div className='restaurant-section col-12'>
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
                    handleOpenReviewRequest={this.handleOpenReviewRequest}
                    handleAddReviewRequest={this.handleAddReviewRequest}
                />
            </div>
        );
    }
}