import React from 'react';
import PropTypes from 'prop-types';

import StarRatingComponent from 'react-star-rating-component';

const ReviewRating = ({grade}) => (
    <div className='col-12 rating'>
        <div className='row justify-content-center justify-content-md-end'>
            <StarRatingComponent
                name='review-grade'
                editing={false}
                starCount={5}
                value={grade}
            />
        </div>
    </div>
);

ReviewRating.propTypes = {
    grade: PropTypes.number
}

export default ReviewRating;