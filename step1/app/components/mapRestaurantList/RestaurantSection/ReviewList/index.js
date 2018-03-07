import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ClosingButton from './ClosingButton';
import Review from './Review';
import ReviewTitle from './ReviewTitle';
import Placeholder from './Placeholder';

export default class ReviewList extends Component {

    static propTypes = {
        currentRestaurant: PropTypes.object
    }

    chooseReviewsToRender(restaurant) {
        if (restaurant.ratings != undefined) {
            return restaurant.ratings.map((review, index) => {

                return <Review
                    key={index}
                    review={review}
                />
            })

        }
    }

    chooseTitleToRender(restaurant) {
        if (restaurant.ratings != undefined) {
        return  <ReviewTitle
                    restaurant={this.props.currentRestaurant}
                />
        } else {
            return <Placeholder />
        }
    }
  
    render() {
        return (
            <div id='review-list'>
                <aside className='col-12'>
                    <div className='row'>
                        <div className='col-12'>
                            <ClosingButton />
                        </div>
                        {this.chooseTitleToRender((this.props.currentRestaurant))}
                        {this.chooseReviewsToRender(this.props.currentRestaurant)}
                    </div>
                </aside>
            </div>
        );
    }
}