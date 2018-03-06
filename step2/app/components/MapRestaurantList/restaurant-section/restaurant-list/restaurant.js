import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StreetPicture from './street-picture';
import RestaurantDetails from './restaurant-details';
import GlobalReview from './global-review';
import AddReviewButton from './add-review-button';
import ReviewListButton from './review-list-button';

export default class Restaurant extends Component {

    static propTypes = {
        restaurant: PropTypes.object,
        handleOpenReviewRequest: PropTypes.func,
        handleAddRestaurantRequest: PropTypes.func,
        id: PropTypes.number
    }

    defineStarColor(grade) {
        if (grade >= 1 && grade <= 2) {
            return 'red-star';

        } else if (grade > 2 && grade < 4) {
            return 'orange-star';

        } else if (grade >= 4 && grade <= 5) {
            return 'green-star';

        } else {
           return 'unknow-star';
        }
    }

    getAverageGrade(restaurant) {
        const reviewNumber = restaurant.ratings.length;
        if (reviewNumber > 0) {
            let total = 0;

            restaurant.ratings.map(function (restaurantReview) {
                total += restaurantReview.stars;
            });

            return Math.round((total / reviewNumber) * 100) / 100;

        } else {
            return 0;
        }
    }

    getSplitedAddress(spliter) {
        return this.props.restaurant.address.split(spliter);
    }

    handleOpenReviewRequest = () => {
        this.props.handleOpenReviewRequest(this.props.restaurant);
    }

    handleAddReviewRequest = () => {
        this.props.handleAddReviewRequest(this.props.restaurant);
    }

    render() {
        return (
            <li className={'restaurant col-10 col-xl-5 align-self-center'}>
                <div className='row justify-content-around'>
                    <StreetPicture
                        address={this.props.restaurant.address}
                    />
                    <RestaurantDetails
                        restaurantName={this.props.restaurant.restaurantName}
                        address={this.getSplitedAddress(',')}
                        reviewNumber={this.props.restaurant.ratings.length}
                    />
                    <div className={'col-12 col-sm-3 col-xl-2'}>
                        <div className={'row justify-content-center'}>
                            <GlobalReview
                                averageGrade={this.getAverageGrade(this.props.restaurant)}
                                pictureName={this.defineStarColor(this.getAverageGrade(this.props.restaurant))}
                            />
                        </div>
                    </div>
                </div>
                <div className={'row justify-content-center justify-content-md-end'}>
                    <AddReviewButton
                        handleAddReviewRequest={this.handleAddReviewRequest}
                    />
                    <ReviewListButton
                        handleOpenReviewRequest={this.handleOpenReviewRequest}
                    />
                </div>
            </li>
        );
    }
}