import React from 'react';
import PropTypes from 'prop-types';

const ReviewListButton = ({onClick}) => (
    <a
        href={'#review-list'}
        id={'openReviewList'}
        className={'col-sm-5 col-xl-3 btn btn-success open-review'}
        onClick={onClick}>
        Lire les avis
    </a>
);

ReviewListButton.propTypes = {
    onClick: PropTypes.func
}

export default ReviewListButton;


