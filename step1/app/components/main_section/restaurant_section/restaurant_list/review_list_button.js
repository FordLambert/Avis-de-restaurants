import React from 'react';
import PropTypes from 'prop-types';

const ReviewListButton = ({openReview}) => (
    <label
        htmlFor={'review-list'}
        className={'col-sm-5 col-xl-3 btn btn-success trigger-button'}
        onClick={openReview}>
        Lire les avis
    </label>
);

ReviewListButton.propTypes = {
    openReview: PropTypes.func
}

export default ReviewListButton;

