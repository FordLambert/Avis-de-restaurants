import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StreetPicture from './StreetPicture';
import RestaurantDetails from './RestaurantDetails';
import GlobalReview from './GlobalReview';
import AddReviewButton from './AddReviewButton';
import ReviewListButton from './ReviewListButton';

export default class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: this.props.restaurant.geometry.location.lat(),
            longitude: this.props.restaurant.geometry.location.lng(),
        };
    }

    static propTypes = {
        restaurant: PropTypes.object,
        handleOpenReviewRequest: PropTypes.func,
        handleAddReviewRequest: PropTypes.func,
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

    getSplitedAddress(spliter) {
        return this.props.restaurant.vicinity.split(spliter);
    }

    handleOpenReviewRequest = () => {
        this.props.handleOpenReviewRequest(this.props.restaurant);
    }

    handleAddReviewRequest = () => {
        this.props.handleAddReviewRequest(this.props.restaurant);
    }

    render() {
        return (
            <li className='restaurant col-10 col-xl-5 align-self-center'>
                <div className='row justify-content-around'>
                    <div className='d-none d-sm-block col-4'>
                        <div className='row justify-content-center'>
                            <StreetPicture
                                restaurant={this.props.restaurant}
                            />
                        </div>
                    </div>
                    <RestaurantDetails
                        restaurantName={this.props.restaurant.name}
                        address={this.getSplitedAddress(',')}
                    />
                    <div className='col-12 col-sm-3 col-xl-2'>
                        <div className='row justify-content-center'>
                            <GlobalReview
                                averageGrade={this.props.restaurant.rating}
                                pictureName={this.defineStarColor(this.props.restaurant.rating)}
                            />
                        </div>
                    </div>
                </div>
                <div className='row justify-content-around justify-content-xl-end restaurant-buttons'>
                    <AddReviewButton
                        handleClick={this.handleAddReviewRequest}
                    />
                    <ReviewListButton
                        handleClick={this.handleOpenReviewRequest}
                    />
                </div>
            </li>
        );
    }
}