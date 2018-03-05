import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ClosingButton from './closing-button';
import Review from './review';
import ReviewTitle from './review-title';
import Placeholder from './placeholder';

export default class ReviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'restaurantReviewed': null
        };
    }

    static propTypes = {
        restaurant: PropTypes.object,
        map: PropTypes.object
    }

    chooseTitleToRender(restaurant) {
        if (restaurant != null) {
            return  <ReviewTitle
                restaurant={restaurant}
            />

        } else {
            return <Placeholder />
        }
    }

    chooseReviewsToRender(restaurant) {
        if (restaurant != null) {
            return restaurant.reviewList.map((review, index) => {
                return <Review
                    key={index}
                    review={review}
                />
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.restaurant != null) {

            if (nextProps.restaurant.reviewList != undefined) {
                this.setState({
                    restaurantReviewed: nextProps.restaurant
                });

            } else {
                const request = {
                    placeId: nextProps.restaurant.place_id
                };
                const service = new google.maps.places.PlacesService(nextProps.map);
                service.getDetails(request, (place, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        nextProps.restaurant.reviewList = place.reviews;
                        this.setState({
                            restaurantReviewed: nextProps.restaurant
                        });
                    }
                });
            }

            if ((nextProps.userReview != null) && (nextProps.userReview != this.props.userReview)) {
                const tempRestaurant = this.state.restaurantReviewed;
                tempRestaurant.reviewList.push(nextProps.userReview);
                this.setState({
                    restaurantReviewed: tempRestaurant
                });
            }
        }
    }
  
    render() {
        return (
            <div id={'review-list'}>
                <aside className={'col-12'}>
                    <div className='row'>
                        <div className={'col-12'}>
                            <ClosingButton />
                        </div>
                        {this.chooseTitleToRender((this.state.restaurantReviewed))}
                        {this.chooseReviewsToRender(this.state.restaurantReviewed)}
                    </div>
                </aside>
            </div>
        );
    }
}