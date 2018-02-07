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

    chooseRenderComponent(restaurantRatings) {
        if (restaurantRatings != undefined) {
            return restaurantRatings.map(function(review, index){
                return <Review key={index}
                        reviewGrade={review.stars}
                        reviewText={review.comment}
                        />;
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
                        {this.chooseRenderComponent(this.props.currentRestaurant.ratings)}
            
                    </div>
                </aside>
            </div>
        );
    }
}