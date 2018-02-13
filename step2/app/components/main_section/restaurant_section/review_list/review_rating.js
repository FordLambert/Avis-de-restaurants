import React from 'react';
import PropTypes from 'prop-types';

import StarRatingComponent from 'react-star-rating-component';

const ReviewRating = ({grade}) => (
    <div className={'col-sm-12 rating'}>
        <StarRatingComponent
            name="review-grade"
            editing={false}
            starCount={5}
            value={grade}
        />
    </div>
);

ReviewRating.propTypes = {
    grade: PropTypes.number
}

export default ReviewRating;