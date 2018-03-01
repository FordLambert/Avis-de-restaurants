import React from 'react';
import PropTypes from 'prop-types';

const ReviewListButton = ({handleOpenReview}) => (
    <a
        href={'#review-list'}
        id={'openReviewList'}
        className={'col-sm-5 col-xl-3 btn btn-success open-review'}
        onClick={handleOpenReview}>
        Lire les avis
    </a>
);

ReviewListButton.propTypes = {
    handleOpenReview: PropTypes.func
}

export default ReviewListButton;


