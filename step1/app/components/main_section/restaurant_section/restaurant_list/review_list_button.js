import React from 'react';
import PropTypes from 'prop-types';

const ReviewListButton = ({handleOpenReview}) => (
    <label
        htmlFor={'review-list'}
        className={'col-sm-5 col-xl-3 btn btn-success trigger-button'}
        onClick={handleOpenReview}>
        Lire les avis
    </label>
);

ReviewListButton.propTypes = {
    handleOpenReview: PropTypes.func
}

export default ReviewListButton;


