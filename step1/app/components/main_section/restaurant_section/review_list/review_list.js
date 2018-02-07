import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Review from './review';
import SlidingLabel from './sliding_label';
import SlidingInput from './sliding_input';
import ReviewTitle from './review_title';

export default class ReviewList extends Component {

    static propTypes = {
        currentRestaurant: PropTypes.object
    }

    chooseRenderComponent(restaurant) {
        if (restaurant.ratings != undefined) {
            return restaurant.ratings.map(function(review, index){
                return <Review key={index} review={review} />
            }.bind(this))
        } else {
            return <p>Rien du tout</p>
        }
    }
  
    render() {
        return (
            <div className={'sliding-wrapper'}>

                <SlidingInput />

                <aside>
                    <div className="row justify-content-center">

                        <ReviewTitle content={this.props.currentRestaurant.name} />
                        <SlidingLabel />
                        {this.chooseRenderComponent(this.props.currentRestaurant)}
                    </div>
                </aside>
            </div>
        );
    }
}