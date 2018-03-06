import React from 'react';
import PropTypes from 'prop-types';

const ReviewListButton = ({handleClick}) => (
    <a
        href='#review-list'
        id='openReviewList'
        className='col-12 col-md-5 col-xl-3 btn btn-success open-review'
        onClick={handleClick}>
        Lire les avis
    </a>
);

ReviewListButton.propTypes = {
    handleClick: PropTypes.func
}

export default ReviewListButton;


