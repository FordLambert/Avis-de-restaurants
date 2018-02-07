import React, {Component} from 'react';
import PropTypes from 'prop-types';

import RestaurantThumbnail from './restaurant_thumbnail';
import RestaurantDetails from './restaurant_details';
import GlobalReview from './global_review';
import ReviewListButton from './review_list_button';

export default class Restaurant extends Component {
    static propTypes = {
        restaurant: PropTypes.object,
        openReview: PropTypes.func
    }

    defineStarColor(grade) {
        if (grade >= 1 && grade <= 2) {
            return 'red-star';
        } else if (grade > 2 && grade < 4) {
            return 'orange-star';
        } else if (grade >= 4 && grade <= 5) {
            return 'green-star';
        } else {
            console.log('Error: rating must be  between 1 and 5')
        }
    }

    getAverageGrade(restaurant) {
        let reviewNumber = restaurant.ratings.length;
        let total = 0;

        restaurant.ratings.map(function(restaurantReview){
            total += restaurantReview.stars;
        });

        return Math.round((total/reviewNumber) * 100) / 100;
    }

    getSplitAddress() {
        let splitAddress = this.props.restaurant.address.split(',');
        return splitAddress;
    }

    handleClick = () => {
        this.props.handleOpenReview(this.props.restaurant);
    }

    render() {
        return (
            <li className={'restaurant col-10 col-lg-5 align-self-center'}>
                <div className="row">

                    <RestaurantThumbnail 
                        href={'#'}
                        pictureName={'restaurant-1.png'} /*--dynamic picture to be implemented--*/
                    />

                    <RestaurantDetails 
                        restaurantName={this.props.restaurant.name}
                        address={this.getSplitAddress()}
                        reviewNumber={this.props.restaurant.ratings.length}
                    />

                    <GlobalReview 
                        averageGrade={this.getAverageGrade(this.props.restaurant)}
                        pictureName={this.defineStarColor(this.getAverageGrade(this.props.restaurant))}
                    />

                </div>

                <div className={'row justify-content-center justify-content-md-end'}>

                    <ReviewListButton
                        handleOpenReview={this.handleClick}
                    />

                </div>
            </li>
        );
    }
}