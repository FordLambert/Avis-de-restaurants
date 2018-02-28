import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ClosingButton from './closing_button';
import Review from './review';
import ReviewTitle from './review_title';
import Placeholder from './placeholder';

export default class ReviewList extends Component {

    static propTypes = {
        currentRestaurant: PropTypes.object
    }

    chooseRenderComponent(restaurant) {
        if (restaurant.ratings != undefined) {
            return restaurant.ratings.map(function(review, index){
                return <Review
                    key={index}
                    review={review}
                />
            }.bind(this))
        }
    }

    chooseRenderTitle(restaurant) {
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
            <div id={'review-list'}>
                <aside className={'col-12'}>
                    <div className="row">
                        <div className={'col-12'}>
                            <ClosingButton />
                        </div>
                        {this.chooseRenderTitle((this.props.currentRestaurant))}
                        {this.chooseRenderComponent(this.props.currentRestaurant)}
                    </div>
                </aside>
            </div>
        );
    }
}