import React from 'react';
import PropTypes from 'prop-types';

const AddReviewButton = ({handleClick}) => (
    <a href='#add-review-popup'
       id='open-review-popup'
       className='col-12 col-md-5 col-xl-3 btn btn-info'
       onClick={handleClick}>
        Votre avis
    </a>
);

AddReviewButton.propTypes = {
    handleClick: PropTypes.func
}

export default AddReviewButton;
