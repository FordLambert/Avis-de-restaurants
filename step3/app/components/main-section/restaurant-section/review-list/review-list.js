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

    chooseRenderTitle(restaurant) {
        if (restaurant != null) {
            return  <ReviewTitle
                restaurant={restaurant}
            />

        } else {
            return <Placeholder />
        }
    }

    chooseRenderComponent(restaurant) {
        if (restaurant != null) {
            return restaurant.reviewList.map(function (review, index) {
                return <Review
                    key={index}
                    review={review}
                />
            }.bind(this))
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.restaurant != null) {

            if (nextProps.restaurant.reviewList != undefined) {
                this.setState({restaurantReviewed: nextProps.restaurant});

            } else {
                const request = {
                    placeId: nextProps.restaurant.place_id
                };
                const service = new google.maps.places.PlacesService(nextProps.map);
                service.getDetails(request, function (place, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        nextProps.restaurant.reviewList = place.reviews;
                        this.setState({
                            restaurantReviewed: nextProps.restaurant
                        });
                    }
                }.bind(this));
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
                    <div className="row">
                        <div className={'col-12'}>
                            <ClosingButton />
                        </div>
                        {this.chooseRenderTitle((this.state.restaurantReviewed))}
                        {this.chooseRenderComponent(this.state.restaurantReviewed)}
                    </div>
                </aside>
            </div>
        );
    }
}