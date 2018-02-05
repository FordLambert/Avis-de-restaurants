import React from 'react';

import {Review} from './review';
import {SlidingLabel} from './sliding-label';
import {SlidingInput} from './sliding-input';
import {ReviewTitle} from './review-title';

export class SlidingAside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'restaurantReviewed': {}};
        this.hadBeenMounted = false;
    }

    addReviewOnClick() {
        document.addEventListener('restaurant-clicked', function(restaurant) {
            this.setState({restaurantReviewed: restaurant.detail})
        }.bind(this));
    }

    chooseRenderComponent() {
        if (this.hadBeenMounted) {
            return this.state.restaurantReviewed.ratings.map(function(review, index){
                return <Review key={index}
                        reviewGrade={review.stars}
                        reviewText={review.comment}
                    />;
                }.bind(this))
        } else {
            return <p>Rien du tout</p>
        }
    }

    componentDidMount() {
        this.hadBeenMounted = true;
    }
  
    render() {
        this.addReviewOnClick();

        return (
            <div className={'sliding-wrapper'}>
                <SlidingInput />

                <aside>
                    <div className="row justify-content-center">
                    
                        <ReviewTitle content={this.state.restaurantReviewed.name} />
                        <SlidingLabel />
                        {this.chooseRenderComponent()}
            
                    </div>
                </aside>
            </div>
        );
    }
}