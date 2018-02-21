import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StarRatingComponent from 'react-star-rating-component';

export default class ReviewRating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: this.props.rating
        };
    }

    static propTypes = {
        handleChange: PropTypes.func
    }

    onStarClick = (nextGrade) => {
        this.props.handleChange(nextGrade);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({rating: nextProps.rating});
    }

    render() {
        const { rating } = this.state;

        return (                
            <div className={'form-rating'}>
                <StarRatingComponent 
                    name="review-rating"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick}
                />
            </div>
        );
    }
}