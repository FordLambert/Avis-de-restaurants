import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StarRatingComponent from 'react-star-rating-component';

export default class ReviewRating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 1
        };
    }

    static propTypes = {
        handleChange: PropTypes.func
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        this.props.handleChange(nextValue);
    }

    render() {
        const { rating } = this.state;

        return (                
            <div className={'form-rating'}>
                <StarRatingComponent 
                    name="review-rating"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        );
    }
}