import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StreetPicture from './street_picture';
import RestaurantDetails from './restaurant_details';
import GlobalReview from './global_review';
import AddReviewButton from './add_review_button';
import ReviewListButton from './review_list_button';
import GooglePlaceDetails from './google_place_details';

export default class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: this.props.restaurant.geometry.location.lat(),
            longitude: this.props.restaurant.geometry.location.lng(),
            restaurantPictureUrl: this.props.restaurant.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250}),
            reviewNumber: 0
        };
    }

    static propTypes = {
        restaurant: PropTypes.object,
        openReview: PropTypes.func,
        id: PropTypes.number,
        map: PropTypes.object
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

    handleOpenReview = () => {
        this.props.handleOpenReview(this.props.restaurant);
    }

    handleAddReview = () => {
        this.props.handleAddReview(this.props.restaurant);
    }

    handleDetails = (restaurant) => {
        this.setState({
            reviewNumber: restaurant.reviews.length,
        });
    }

    render() {
        return (
            <li className={'restaurant col-10 col-xl-5 align-self-center'}>
                <GooglePlaceDetails
                    map={this.props.map}
                    placeId={this.props.restaurant.place_id}
                    handleDetails={this.handleDetails}
                />
                <div className='row justify-content-around'>
                    <StreetPicture
                        src={this.state.restaurantPictureUrl}
                    />
                    <RestaurantDetails
                        restaurantName={this.props.restaurant.name}
                        address={this.getSplitedAddress(',')}
                        reviewNumber={this.state.reviewNumber}
                    />
                    <div className={'col-12 col-sm-3 col-xl-2'}>
                        <div className={'row justify-content-center'}>
                            <GlobalReview
                                averageGrade={this.props.restaurant.rating}
                                pictureName={this.defineStarColor(this.props.restaurant.rating)}
                            />
                        </div>
                    </div>
                </div>
                <div className={'row justify-content-center justify-content-md-end'}>
                    <AddReviewButton
                        handleAddReview={this.handleAddReview}
                    />
                    <ReviewListButton
                        handleOpenReview={this.handleOpenReview}
                    />
                </div>
            </li>
        );
    }
}