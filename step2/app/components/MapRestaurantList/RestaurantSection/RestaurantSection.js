import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalWindow from './NewReviewModal/ModalWindow';
import ReviewList from './ReviewList/ReviewList';
import RestaurantList from './RestaurantList/RestaurantList';

export default class RestaurantSection extends Component {
    constructor(props) {
        super(props);
        this.state = {'currentRestaurant': {}};
    }

    static propTypes = {
        restaurantList: PropTypes.array,
        restaurantRequested: PropTypes.object
    }

    handleReviewSubmit = (grade, review) => {
        const tempRestaurant = this.state.currentRestaurant;
        const newRating = {
            'stars': grade,
            'comment': review
        }
        tempRestaurant.ratings.push(newRating);

        this.setState({currentRestaurant: tempRestaurant});
    }

    handleOpenReviewRequest = (restaurant) => {
        this.setState({
            currentRestaurant: restaurant
        });
    }

    handleAddReviewRequest = (restaurant) => {
        this.setState({
            currentRestaurant: restaurant
        });
    }

    componentWillUpdate(nextProps) {
        if (this.props.restaurantRequested != nextProps.restaurantRequested) {
            this.setState({
                currentRestaurant: nextProps.restaurantRequested
            });
        }
    }

    render() {
        return (
            <div className='restaurant-section col-12'>
                <ModalWindow
                    handleReviewSubmit={this.handleReviewSubmit}
                    restaurantReviewed={this.state.currentRestaurant}
                />
                <ReviewList
                    currentRestaurant={this.state.currentRestaurant}
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