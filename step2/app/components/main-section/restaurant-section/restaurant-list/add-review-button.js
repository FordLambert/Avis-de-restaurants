import React from 'react';
import PropTypes from 'prop-types';

const AddReviewButton = ({handleAddReview}) => (
    <a href={'#add-review-popup'}
       id={'open-review-popup'}
       className={'col-sm-5 col-md-3 col-lg-5 col-xl-3 btn btn-info'}
       onClick={handleAddReview}>
        Votre avis
    </a>
);

AddReviewButton.propTypes = {
    handleAddReview: PropTypes.func
}

export default AddReviewButton;
