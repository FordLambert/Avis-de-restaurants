import React from 'react';
import PropTypes from 'prop-types';

const ReviewListButton = ({handleOpenReviewRequest}) => (
    <a
        href={'#review-list'}
        id={'openReviewList'}
        className={'col-sm-5 col-xl-3 btn btn-success open-review'}
        onClick={handleOpenReviewRequest}>
        Lire les avis
    </a>
);

ReviewListButton.propTypes = {
    handleOpenReviewRequest: PropTypes.func
}

export default ReviewListButton;